export const peaksFinder = (() => {
  /**
   * See https://en.wikipedia.org/wiki/Mexican_hat_wavelet
   */
  function ricker() {
    let σ = 1;

    const rk = t => {
      const t2 = t * t;
      const variance = σ * σ;

      const C = 2.0 / (Math.sqrt(3 * σ) * Math.PI ** 0.25);
      const norm = 1.0 - t2 / variance;
      const gauss = Math.exp(-t2 / (2 * variance));

      return C * norm * gauss;
    };

    rk.std = function(_) {
      const result = arguments.length ? ((σ = _), rk) : σ;
      return result;
    };

    /**
     * Range of points to sample from the wavelet. [-reach, reach]
     */
    rk.reach = function() {
      return 5 * σ;
    };

    return rk;
  }

  function convolve() {
    let kernel = ricker();

    function range(reach) {
      const r = +reach;
      let i = -1;
      const n = 2 * r + 1;
      const rg = new Array(n);
      // eslint-disable-next-line no-plusplus
      while (++i < n) {
        rg[i] = -r + i;
      }
      return rg;
    }

    function boundingBox(n, reach, lo, hi) {
      for (let i = 1; i <= reach; i += 1) {
        const left = n - i;
        const right = n + i;
        if (left <= lo && right >= hi) return range(i - 1);
      }
      return range(reach);
    }

    /**
     * y[n] = Sum_k{x[k] * h[n-k]}
     * y: output
     * x: input
     * h: smoother
     */
    const conv = function(signal) {
      const size = signal.length;
      let n = -1;
      const convolution = new Array(size);

      // eslint-disable-next-line no-plusplus
      while (++n < size) {
        let y = 0;

        const box = boundingBox(n, kernel.reach(), 0, size - 1);
        // eslint-disable-next-line
        box.forEach(δ => {
          const k = n + δ;
          y += signal[k] * kernel(δ);
        });
        convolution[n] = y;
      }

      return convolution;
    };

    conv.kernel = function(_) {
      const result = arguments.length ? ((kernel = _), conv) : kernel;
      return result;
    };

    return conv;
  }

  function isLocalMaxima(arr, index) {
    const current = arr[index];
    const left = arr[index - 1];
    const right = arr[index + 1];

    if (left !== undefined && right !== undefined) {
      if (current > left && current > right) {
        return true;
      } else if (current >= left && current > right) {
        return true;
      } else if (current > left && current >= right) {
        return true;
      }
    } else if (left !== undefined && current > left) {
      return true;
    } else if (right !== undefined && current > right) {
      return true;
    }

    return false;
  }

  /**
   * @param {arr} row in the CWT matrix.
   * @return Array of indices with relative maximas.
   */
  function maximas(arr) {
    const maxs = [];
    arr.forEach((value, index) => {
      if (isLocalMaxima(arr, index)) maxs.push({ x: index, y: value });
    });
    return maxs;
  }

  function nearestNeighbor(line, maxs, window) {
    const cache = {};
    maxs.forEach(d => {
      cache[d.x] = d.y;
    });

    const point = line.top();
    for (let i = 0; i <= window; i += 1) {
      const left = point.x + i;
      const right = point.x - i;

      if (left in cache && right in cache) {
        if (cache[left] > cache[right]) {
          return left;
        }
        return right;
      } else if (left in cache) {
        return left;
      } else if (right in cache) {
        return right;
      }
    }
    return null;
  }

  function percentile(arr, perc) {
    const { length } = arr;
    const index = Math.min(length - 1, Math.ceil(perc * length));

    arr.sort((a, b) => a - b);
    return arr[index];
  }

  function Point(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.snr = undefined;
  }

  Point.prototype.SNR = function(conv) {
    const smoothingFactor = 0.00001;
    let signal = this.y;

    const lowerBound = Math.max(0, this.x - this.width);
    const upperBound = Math.min(conv.length, this.x + this.width + 1);
    const neighbors = conv.slice(lowerBound, upperBound);
    let noise = percentile(neighbors, 0.95);

    signal += smoothingFactor;
    noise += smoothingFactor;
    this.snr = signal / noise;
    return this.snr;
  };

  Point.prototype.serialize = function() {
    return { index: this.x, width: this.width, snr: this.snr };
  };

  function RidgeLine() {
    this.points = [];
    this.gap = 0;
  }

  /**
   * If the point is valid append it to the ridgeline, and reset the gap.
   * Otherwise, increment the gap and do nothing.
   *
   * @param {point} Point object.
   */
  RidgeLine.prototype.add = function(point) {
    if (point === null || point === undefined) {
      this.gap += 1;
    } else {
      this.points.push(point);
      this.gap = 0;
    }
  };

  /**
   * @return {Point} Last point added into the ridgeline.
   */
  RidgeLine.prototype.top = function() {
    return this.points[this.points.length - 1];
  };

  /**
   * @return {number} Length of points on the ridgeline.
   */
  RidgeLine.prototype.length = function() {
    return this.points.length;
  };

  /**
   * @return {boolean} True if the gap in the line is above a threshold. False otherwise.
   */
  RidgeLine.prototype.isDisconnected = function(threshold) {
    return this.gap > threshold;
  };

  /**
   * @param {Array} Smallest scale in the convolution matrix
   */
  RidgeLine.prototype.SNR = function(conv) {
    let maxSnr = Number.NEGATIVE_INFINITY;
    this.points.forEach(point => {
      const snr = point.SNR(conv);
      if (snr > maxSnr) maxSnr = snr;
    });
    return maxSnr;
  };

  function findPeaks() {
    let kernel = ricker;
    let gapThreshold = 1;
    let minLineLength = 1;
    let minSNR = 1.0;
    let widths = [1];

    const CWT = signal => {
      const M = new Array(widths.length);
      widths.forEach((width, i) => {
        const smoother = kernel().std(width);
        const transform = convolve().kernel(smoother);

        const convolution = transform(signal);
        M[i] = convolution;
      });
      return M;
    };

    const initializeRidgeLines = M => {
      const n = widths.length;
      const locals = maximas(M[n - 1], widths[n - 1]);
      const ridgeLines = [];
      locals.forEach(d => {
        const point = new Point(d.x, d.y, widths[n - 1]);
        const line = new RidgeLine();
        line.add(point);
        ridgeLines.push(line);
      });
      return ridgeLines;
    };

    const connectRidgeLines = (M, ridgeLines) => {
      const n = widths.length;
      for (let row = n - 2; row >= 0; row -= 1) {
        const locals = maximas(M[row], widths[row]);
        const addedLocals = [];

        // Find nearest neighbor at next scale and add to the line
        // eslint-disable-next-line no-loop-func
        ridgeLines.forEach(line => {
          const x = nearestNeighbor(line, locals, widths[row]);
          line.add(x === null ? null : new Point(x, M[row][x], widths[row]));

          if (x !== null) {
            addedLocals.push(x);
          }
        });

        // Remove lines that has exceeded the gap threshold
        // eslint-disable-next-line
        ridgeLines = ridgeLines.filter(
          // eslint-disable-next-line no-loop-func
          line => !line.isDisconnected(gapThreshold)
        );

        // Add all the unitialized ridge lines
        // eslint-disable-next-line no-loop-func
        locals.forEach(d => {
          if (addedLocals.indexOf(d.x) !== -1) return;

          const point = new Point(d.x, d.y, widths[row]);
          const ridgeLine = new RidgeLine();
          ridgeLine.add(point);
          ridgeLines.push(ridgeLine);
        });
      }
      return ridgeLines;
    };

    const filterRidgeLines = (signal, ridgeLines) => {
      const smoother = kernel().std(1.0);
      const transform = convolve().kernel(smoother);
      const convolution = transform(signal);

      const rl = ridgeLines.filter(line => {
        const snr = line.SNR(convolution);
        return snr >= minSNR && line.length() >= minLineLength;
      });
      return rl;
    };

    /**
     * Pick the point on the ridgeline with highest SNR.
     */
    const peaks = (signal, ridgeLines) => {
      const pk = ridgeLines.map(line => {
        const { points } = line;
        let maxValue = Number.NEGATIVE_INFINITY;
        let maxPoint;
        points.forEach(point => {
          const y = signal[point.x];
          if (y > maxValue) {
            maxPoint = point;
            maxValue = y;
          }
        });
        return maxPoint.serialize();
      });
      return pk;
    };

    const fp = signal => {
      const M = CWT(signal);

      const ridgeLines = initializeRidgeLines(M);
      const connectedRidgeLines = connectRidgeLines(M, ridgeLines);
      const filteredRidgeLines = filterRidgeLines(signal, connectedRidgeLines);

      return peaks(signal, filteredRidgeLines);
    };

    /**
     * Smoothing function.
     */
    fp.kernel = function(_) {
      const result = arguments.length ? ((kernel = _), fp) : kernel;
      return result;
    };

    /**
     * Expected widths of the peaks.
     */
    fp.widths = function(_) {
      _.sort((a, b) => a - b);
      const result = arguments.length ? ((widths = _), fp) : widths;
      return result;
    };

    /**
     * Number of gaps that we allow in the ridge lines.
     */
    fp.gapThreshold = function(_) {
      const result = arguments.length ? ((gapThreshold = _), fp) : gapThreshold;
      return result;
    };

    /**
     * Minimum ridge line length.
     */
    fp.minLineLength = function(_) {
      const result = arguments.length
        ? ((minLineLength = _), fp)
        : minLineLength;
      return result;
    };

    /**
     * Minimum signal to noise ratio for the peaks.
     */
    fp.minSNR = function(_) {
      const result = arguments.length ? ((minSNR = _), fp) : minSNR;
      return result;
    };

    return fp;
  }

  return {
    ricker,
    convolve,
    findPeaks
  };
})();

import { install } from '@plugjs/plug/pipe'

import { Coverage } from './coverage'

import type { SourceMapBias } from './analysis'

/** Options to analyse coverage reports */
export interface CoverageOptions {
  /** The bias for source map analisys (defaults to `greatest_lower_bound`) */
  sourceMapBias?: SourceMapBias
  /** Minimum _overall_ coverage (as a percentage, defaults to 50) */
  minimumCoverage?: number,
  /** Optimal _overall_ coverage (as a percentage, defaults to 50)  */
  optimalCoverage?: number,
  /** Minimum _per-file_ coverage (as a percentage, defaults to 75) */
  minimumFileCoverage?: number,
  /** Optimal _per-file_ coverage (as a percentage, defaults to 75) */
  optimalFileCoverage?: number,
}

export interface CoverageReportOptions extends CoverageOptions {
  /** If specified, a JSON and HTML report will be written to this directory */
  reportDir: string,
}

declare module '@plugjs/plug' {
  export interface Pipe {
    /**
     * Analyse coverage using files generated by V8/NodeJS.
     *
     * @param coverageDir The directory where the `coverage-XXX.json` files
     *                    generated by V8/NodeJS can be found.
     */
    coverage(coverageDir: string): Promise<undefined>
    /**
     * Analyse coverage using files generated by V8/NodeJS.
     *
     * @param coverageDir The directory where the `coverage-XXX.json` files
     *                    generated by V8/NodeJS can be found.
     * @param options Extra {@link CoverageOptions | options} allowing to
     *                specify coverage thresholds.
     */
    coverage(coverageDir: string, options: CoverageOptions): Promise<undefined>
    /**
     * Analyse coverage using files generated by V8/NodeJS and produce an HTML
     * report in the directory specified in `options`.
     *
     * @param coverageDir The directory where the `coverage-XXX.json` files
     *                    generated by V8/NodeJS can be found.
     * @param options Extra {@link CoverageOptions | options} allowing to
     *                specify coverage thresholds where the HTML report should
     *                be written to.
     */
    coverage(coverageDir: string, options: CoverageReportOptions): Pipe
  }
}

/* ========================================================================== *
 * INSTALLATION / IMPLEMENTATION                                              *
 * ========================================================================== */

install('coverage', Coverage)

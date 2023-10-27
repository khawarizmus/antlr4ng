/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ATNConfigSet } from "../index.ts";
import { BitSet } from "../misc/BitSet.ts";

/* eslint-disable @typescript-eslint/naming-convention */

export declare class PredictionMode {
    public static SLL: number;
    public static LL: number;
    public static LL_EXACT_AMBIG_DETECTION: number;

    public static hasConfigInRuleStopState(configs: ATNConfigSet): boolean;
    public static allConfigsInRuleStopStates(configs: ATNConfigSet): boolean;
    public static getAlts(altSets: BitSet[]): BitSet;
    public static getConflictingAltSubsets(configs: ATNConfigSet): BitSet[];
}

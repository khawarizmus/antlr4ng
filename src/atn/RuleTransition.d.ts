/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ATNState } from "../atn/ATNState.js";
import { Transition } from "./Transition.js";

export declare class RuleTransition extends Transition {
    public ruleIndex: number;
    public precedence: number;
    public followState: ATNState;
    public get isEpsilon(): boolean;

    public constructor(ruleStart: ATNState, ruleIndex: number, precedence: number, followState: ATNState);

    public override getSerializationType(): number;
    public matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
}

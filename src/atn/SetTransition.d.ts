/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { IntervalSet } from "../misc/IntervalSet.js";
import { ATNState } from "../atn/ATNState.js";
import { Transition } from "./Transition.js";

export declare class SetTransition extends Transition {
    public set: IntervalSet;

    public constructor(target: ATNState, set: IntervalSet);

    public override getSerializationType(): number;
    public override matches(symbol: number, minVocabSymbol: number, maxVocabSymbol: number): boolean;
    public toString(): string;
}

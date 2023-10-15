/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { IntervalSet } from "../misc/IntervalSet.js";
import { Transition } from "./Transition.js";
import { TransitionType } from './TransitionType.js';

export class RangeTransition extends Transition {
    #label;

    constructor(target, start, stop) {
        super(target);
        this.start = start;
        this.stop = stop;
        this.#label = this.makeLabel();
    }

    get label() {
        return this.#label;
    }

    makeLabel() {
        const s = new IntervalSet();
        s.addRange(this.start, this.stop);
        return s;
    }

    getSerializationType() {
        return TransitionType.RANGE;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return symbol >= this.start && symbol <= this.stop;
    }

    toString() {
        return "'" + String.fromCharCode(this.start) + "'..'" + String.fromCharCode(this.stop) + "'";
    }
}

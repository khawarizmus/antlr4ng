/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

// A transition containing a set of values.
import { IntervalSet } from "../misc/IntervalSet.js";
import { Token } from '../Token.js';
import { Transition } from "./Transition.js";
import { TransitionType } from "./TransitionType.js";

export class SetTransition extends Transition {
    #label;

    constructor(target, set) {
        super(target);
        if (set !== undefined && set !== null) {
            this.#label = set;
        } else {
            this.#label = new IntervalSet();
            this.#label.addOne(Token.INVALID_TYPE);
        }
    }

    get label() {
        return this.#label;
    }

    getSerializationType() {
        return TransitionType.SET;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return this.label.contains(symbol);
    }

    toString() {
        return this.label.toString();
    }
}

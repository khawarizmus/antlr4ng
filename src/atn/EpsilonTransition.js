/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Transition } from "./Transition.js";
import { TransitionType } from "./TransitionType.js";

export class EpsilonTransition extends Transition {
    constructor(target, outermostPrecedenceReturn) {
        super(target);
        this.outermostPrecedenceReturn = outermostPrecedenceReturn;
    }

    get isEpsilon() {
        return true;
    }

    matches(symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    }

    getSerializationType() {
        return TransitionType.EPSILON;
    }

    toString() {
        return "epsilon";
    }
}

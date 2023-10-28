/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { PrecedencePredicate } from "./PrecedencePredicate.js";
import { AbstractPredicateTransition } from "./AbstractPredicateTransition.js";
import { TransitionType } from "./TransitionType.js";
import { ATNState } from "./ATNState.js";

export class PrecedencePredicateTransition extends AbstractPredicateTransition {
    public readonly precedence: number;

    public constructor(target: ATNState, precedence: number) {
        super(target);
        this.precedence = precedence;
    }

    public override get isEpsilon(): boolean {
        return true;
    }

    public matches(_symbol: number, _minVocabSymbol: number, _maxVocabSymbol: number): boolean {
        return false;
    }

    public getPredicate(): PrecedencePredicate {
        return new PrecedencePredicate(this.precedence);
    }

    public getSerializationType(): number {
        return TransitionType.PRECEDENCE;
    }

    public override toString(): string {
        return this.precedence + " >= _p";
    }
}

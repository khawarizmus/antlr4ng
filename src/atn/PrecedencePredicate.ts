/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Recognizer } from "../Recognizer.js";
import { HashCode } from "../misc/HashCode.js";
import { ATNSimulator } from "./ATNSimulator.js";
import { RuleContext } from "./RuleContext.js";
import { SemanticContext } from "./SemanticContext.js";

export class PrecedencePredicate extends SemanticContext {
    public readonly precedence: number;

    public constructor(precedence?: number) {
        super();
        this.precedence = precedence ?? 0;
    }

    public override evaluate<T extends ATNSimulator>(parser: Recognizer<T>, outerContext: RuleContext): boolean {
        return parser.precpred(outerContext, this.precedence);
    }

    public override evalPrecedence(parser: Recognizer<ATNSimulator>,
        outerContext: RuleContext | null): SemanticContext | null {
        if (parser.precpred(outerContext, this.precedence)) {
            return SemanticContext.NONE;
        } else {
            return null;
        }
    }

    public compareTo(other: PrecedencePredicate): number {
        return this.precedence - other.precedence;
    }

    public override updateHashCode(hash: HashCode): void {
        hash.update(this.precedence);
    }

    public override equals(other: unknown): boolean {
        if (this === other) {
            return true;
        } else if (!(other instanceof PrecedencePredicate)) {
            return false;
        } else {
            return this.precedence === other.precedence;
        }
    }

    public override toString(): string {
        return "{" + this.precedence + ">=prec}?";
    }

}

// XXX: HORRIBLE workaround circular import, avoiding dynamic import
SemanticContext.PrecedencePredicate = PrecedencePredicate;

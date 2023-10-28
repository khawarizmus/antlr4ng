/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { Recognizer } from "../Recognizer.js";
import { HashCode } from "../misc/HashCode.js";
import { ATNSimulator } from "./ATNSimulator.js";
import { RuleContext } from "../RuleContext.js";
import { SemanticContext } from "./SemanticContext.js";

export class Predicate extends SemanticContext {
    public readonly ruleIndex: number;
    public readonly predIndex: number;
    public readonly isCtxDependent: boolean;  // e.g., $i ref in pred

    public constructor(ruleIndex?: number, predIndex?: number, isCtxDependent?: boolean) {
        super();
        this.ruleIndex = ruleIndex ?? -1;
        this.predIndex = predIndex ?? -1;
        this.isCtxDependent = isCtxDependent ?? false;
    }

    public override evaluate<T extends ATNSimulator>(parser: Recognizer<T>, outerContext: RuleContext): boolean {
        const localctx = this.isCtxDependent ? outerContext : null;

        return parser.sempred(localctx, this.ruleIndex, this.predIndex);
    }

    public override updateHashCode(hash: HashCode): void {
        hash.update(this.ruleIndex, this.predIndex, this.isCtxDependent);
    }

    public override equals(other: unknown): boolean {
        if (this === other) {
            return true;
        } else if (!(other instanceof Predicate)) {
            return false;
        } else {
            return this.ruleIndex === other.ruleIndex &&
                this.predIndex === other.predIndex &&
                this.isCtxDependent === other.isCtxDependent;
        }
    }

    public override toString(): string {
        return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
    }
}

/**
 * The default {@link SemanticContext}, which is semantically equivalent to
 * a predicate of the form {@code {true}?}
 */
// @ts-ignore
SemanticContext.NONE = new Predicate();

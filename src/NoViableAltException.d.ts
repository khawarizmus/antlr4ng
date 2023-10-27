/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import { ATNConfigSet } from "./atn/ATNConfigSet.js";
import { Token } from "./Token.js";
import { RecognitionException } from "./RecognitionException.js";
import { ParserRuleContext } from "./ParserRuleContext.js";
import { TokenStream } from "./TokenStream.js";
import { Parser } from "./index.ts";

export declare class NoViableAltException extends RecognitionException {
    public deadEndConfigs: ATNConfigSet;
    public startToken: Token;

    public constructor(recognizer: Parser, input?: TokenStream | null, startToken?: Token | null,
        offendingToken?: Token | null, deadEndConfigs?: ATNConfigSet | null, ctx?: ParserRuleContext);
}

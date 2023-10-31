/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

/* eslint-disable jsdoc/require-returns, no-underscore-dangle */

import { CharStream } from "./CharStream.js";
import { Recognizer } from "./Recognizer.js";
import { Token } from "./Token.js";
import { TokenSource } from "./TokenSource.js";
import { ATNSimulator } from "./atn/ATNSimulator.js";

// TODO: this has to implement WritableToken (which requires Token to be an interface).
export class CommonToken extends Token {
    /**
     * An empty tuple which is used as the default value of
     * {@link source} for tokens that do not have a source.
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly EMPTY_SOURCE: [TokenSource | null, CharStream | null] = [null, null];

    /**
     * This is the backing field for {@link #getTokenSource} and
     * {@link #getInputStream}.
     *
     * <p>
     * These properties share a field to reduce the memory footprint of
     * {@link CommonToken}. Tokens created by a {@link CommonTokenFactory} from
     * the same source and input stream share a reference to the same
     * {@link Pair} containing these values.</p>
     */
    protected source: [TokenSource | null, CharStream | null];

    /**
     * This is the backing field for {@link #getText} when the token text is
     * explicitly set in the constructor or via {@link #setText}.
     *
     * @see #getText()
     */
    protected _text: string | null = null;

    public constructor(source: [TokenSource | null, CharStream | null], type: number, channel: number, start: number,
        stop: number) {
        super();

        this.source = source ?? CommonToken.EMPTY_SOURCE;
        this.type = type ?? 0;
        this.channel = channel !== undefined ? channel : Token.DEFAULT_CHANNEL;
        this.start = start !== undefined ? start : -1;
        this.stop = stop !== undefined ? stop : -1;
        this.tokenIndex = -1;
        if (this.source[0] !== null) {
            this.line = source[0]!.line;
            // eslint-disable-next-line no-underscore-dangle
            this.column = source[0]!._tokenStartColumn;
        } else {
            this.column = -1;
        }
    };

    /**
     * Constructs a new {@link CommonToken} as a copy of another {@link Token}.
     *
     * <p>
     * If {@code oldToken} is also a {@link CommonToken} instance, the newly
     * constructed token will share a reference to the {@link text} field and
     * the {@link Pair} stored in {@link source}. Otherwise, {@link text} will
     * be assigned the result of calling {@link getText}, and {@link source}
     * will be constructed from the result of {@link Token//getTokenSource} and
     * {@link Token//getInputStream}.</p>
     */
    public override clone(): CommonToken {
        const t = new CommonToken(this.source, this.type, this.channel, this.start, this.stop);
        t.tokenIndex = this.tokenIndex;
        t.line = this.line;
        t.column = this.column;
        t.text = this.text;

        return t;
    }

    public override cloneWithType(type: number): CommonToken {
        const t = new CommonToken(this.source, type, this.channel, this.start, this.stop);
        t.tokenIndex = this.tokenIndex;
        t.line = this.line;
        t.column = this.column;
        if (type === Token.EOF) { t.text = ""; }

        return t;
    }

    public override toString(recognizer?: Recognizer<ATNSimulator>): string {
        let channelStr = "";
        if (this.channel > 0) {
            channelStr = ",channel=" + this.channel;
        }

        let text = this.text;
        if (text) {
            text = text.replace(/\n/g, "\\n");
            text = text.replace(/\r/g, "\\r");
            text = text.replace(/\t/g, "\\t");
        } else {
            text = "<no text>";
        }

        let typeString = String(this.type);
        if (recognizer) {
            typeString = recognizer.vocabulary.getDisplayName(this.type) ?? "<unknown>";
        }

        return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + text + "',<" + typeString + ">" +
            channelStr + "," + this.line + ":" + this.column + "]";
    }

    public override get text(): string | null {
        if (this._text !== null) {
            return this._text;
        }
        const input = this.getInputStream();
        if (input === null) {
            return null;
        }
        const n = input.size;
        if (this.start < n && this.stop < n) {
            return input.getText(this.start, this.stop);
        } else {
            return "<EOF>";
        }
    }

    public override set text(text: string | null) {
        this._text = text;
    }
}

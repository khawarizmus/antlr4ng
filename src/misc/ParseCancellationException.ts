/*
 * Copyright (c) The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

// For jsdoc only.
import type { RecognitionException } from "../RecognitionException.js";
import type { BailErrorStrategy } from "../BailErrorStrategy.js";

/**
 * This exception is thrown to cancel a parsing operation. This exception does
 * not extend {@link RecognitionException}, allowing it to bypass the standard
 * error recovery mechanisms. {@link BailErrorStrategy} throws this exception in
 * response to a parse error.
 *
 * @author Sam Harwell
 */
export class ParseCancellationException extends Error {

    public constructor();
    public constructor(message: string);
    public constructor(cause: Error);
    public constructor(message: string, cause: Error);
    public constructor(...args: unknown[]) {
        switch (args.length) {
            case 0: {
                super();

                break;
            }

            case 1: {
                if (typeof args[0] === "string") {
                    const [message] = args;
                    super(message);

                    break;
                }

                const [cause] = args as [Error];
                super("", { cause });

                break;
            }

            case 2: {
                const [message, cause] = args as [string, Error];
                super(message, cause);

                break;
            }

            default: {
                throw new Error(`Invalid number of arguments`);
            }
        }
    }
}

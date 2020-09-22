"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogueSequenceWithFlow = exports.DialogueSequence = exports.DialogueWithFlow = exports.DialogueMenu = exports.Dialogue = void 0;
class Dialogue {
    constructor(key, list, responds, chooseResponse) {
        this.key = key;
        this.list = list;
        if (Array.isArray(responds) && responds.length == 0) {
            throw new SyntaxError("Error in Dialogue Constructor: Responses is Array of length 0.");
        }
        this.responds = responds;
        if (chooseResponse) {
            this.chooseResponse = chooseResponse;
        }
        else {
            this.chooseResponse = function (inp, resps) {
                if (typeof resps == "string" || (Array.isArray(resps) && resps.length == 1)) {
                    return;
                }
            };
        }
    }
    ;
}
exports.Dialogue = Dialogue;
class DialogueMenu {
}
exports.DialogueMenu = DialogueMenu;
class DialogueWithFlow extends DialogueMenu {
}
exports.DialogueWithFlow = DialogueWithFlow;
class DialogueSequence {
}
exports.DialogueSequence = DialogueSequence;
class DialogueSequenceWithFlow extends DialogueSequence {
}
exports.DialogueSequenceWithFlow = DialogueSequenceWithFlow;

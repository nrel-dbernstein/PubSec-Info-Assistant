// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Options16Filled, ArrowSync16Filled, Briefcase16Filled, Globe16Filled, BuildingMultipleFilled,DesktopSpeakerFilled } from "@fluentui/react-icons";

import styles from "./RAIPanel.module.css";
import { Icon } from "@fluentui/react";
import { Approaches, ChatMode } from "../../api";

interface Props {
    approach?: Approaches;
    chatMode?: ChatMode;
    onAdjustClick?: () => void;
    onRegenerateClick?: () => void;
    onWebSearchClicked?: () => void;
    onRagSearchClicked?: () => void;
    onWebCompareClicked?: () => void;
    onRagCompareClicked?: () => void;
    isInAnswer?: boolean;
    generateAnswer?: () => void;
    speakResponses?: boolean;
    isSpeaking?: boolean;
}

export const RAIPanel = ({approach, chatMode, onAdjustClick, onRegenerateClick, onWebSearchClicked, onRagSearchClicked, onWebCompareClicked, onRagCompareClicked, isInAnswer,generateAnswer, speakResponses, isSpeaking }: Props) => {
    return (
        <div className={styles.adjustInputContainer}>
            <div className={styles.adjustInput} onClick={onAdjustClick}>
                <Options16Filled primaryFill="rgba(133, 133, 133, 1)" />
                <span className={styles.adjustInputText}>Adjust</span>
            </div>
            <div className={styles.adjustInput} onClick={onRegenerateClick}>
                <ArrowSync16Filled primaryFill="rgba(133, 133, 133, 1)" />
                <span className={styles.adjustInputText}>Regenerate</span>
            </div>
            {isInAnswer && speakResponses && <div className={styles.adjustInput} onClick={() => { if (!isSpeaking && generateAnswer) generateAnswer(); }}>
                <DesktopSpeakerFilled primaryFill="rgba(133, 133, 133, 1)" />
                <span className={styles.adjustInputText}>Speak Response</span>
            </div>}
            {(approach == Approaches.ChatWebRetrieveRead && chatMode == ChatMode.WorkPlusWeb) &&
                    <>
                        <div className={styles.adjustInput} onClick={onRagSearchClicked}>
                            <BuildingMultipleFilled primaryFill="rgba(133, 133, 133, 1)" />
                            <span className={styles.adjustInputText}>Search Work</span>
                        </div>
                        <div className={styles.adjustInput} onClick={onRagCompareClicked}>
                            <BuildingMultipleFilled primaryFill="rgba(133, 133, 133, 1)" />
                            <span className={styles.adjustInputText}>Compare with Work</span>
                        </div>
                    </>
            }
            {(approach == Approaches.ReadRetrieveRead && chatMode == ChatMode.WorkPlusWeb) &&
                    <>
                        <div className={styles.adjustInput} onClick={onWebSearchClicked}>
                            <Globe16Filled primaryFill="rgba(133, 133, 133, 1)" />
                            <span className={styles.adjustInputText}>Search Web</span>
                        </div>
                        <div className={styles.adjustInput} onClick={onWebCompareClicked}>
                            <Globe16Filled primaryFill="rgba(133, 133, 133, 1)" />
                            <span className={styles.adjustInputText}>Compare with Web</span>
                        </div>
                    </>
            }
        </div>
    );
};
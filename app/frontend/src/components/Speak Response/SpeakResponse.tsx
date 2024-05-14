// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Button, ButtonGroup } from "react-bootstrap";
import { Label } from "@fluentui/react";
import Switch from 'react-switch';
import styles from "./SpeakResponse.module.css";
import chatstyles from "../../pages/chat/Chat.module.css"; 


interface Props {
    className?: string;
    onToggle: (_ev: any) => void;
    speakResponse: boolean;
}


export const SpeakResponse = ({ className, onToggle, speakResponse }: Props) => {
    return (
        <div className={`${styles.container} ${className ?? ""}`}>
            <Label>Speak Response:</Label>
            <div className={chatstyles.defaultApproachSwitch}>
                <div className={chatstyles.defaultApproachWebOption} onClick={onToggle}>No</div>
                <Switch  onChange={onToggle} checked={speakResponse} uncheckedIcon={true} checkedIcon={true} onColor="#1B4AEF" offColor="#188d45"/>
                <div className={chatstyles.defaultApproachWorkOption} onClick={onToggle}>Yes</div>
            </div>
        </div>
    );
};

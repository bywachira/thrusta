import React from "react";

export type CommandHistory = {
    command: string;
    output?: string;
    renderContent?: () => React.ReactElement
}
export declare enum PROCESS_STATE {
    CALLING_INTERCEPTION_REQUEST = 0,
    CALLING_INTERCEPTION_RESPONSE = 1
}
export declare class ProcessState {
    history: PROCESS_STATE[];
    private static instance;
    private constructor();
    static getInstance(): ProcessState;
    addState: (state: PROCESS_STATE) => void;
    private getEventByLastEventByName;
    reset: () => void;
    waitForEvent: (state: PROCESS_STATE, timeInMS?: number) => Promise<unknown>;
}

export type propsBlogs = {
    _id: string,
    Title: string,
    Date: Date,
    Image: string,
    Description?: string,
    Like: string[],
    Type: string,
    Commentaire?: any[]
}
export interface AlertProps {
    alerting: {
        type: string,
        text: string
    };
    open: boolean;
}
export type Action = 'like' | 'unlike'
export interface SnackbarProps {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'center' | 'right';
    onClose?: (event: React.SyntheticEvent<any, Event>, reason: string) => void;
}

export type valuesEdit = {
    _id: string,
    Title: string,
    Image: string,
    Description: string,
}

export interface SignupFormValues {
    Title: string;
    Image: string;
    Description: string;
}
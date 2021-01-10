export interface IModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handleSignIn: (type: string) => void;
}

export interface IDropdown {
    items: {
        label: string;
        id: string;
    }[];
    onSelectItem: (item: {
        label: string;
        id: React.ReactText
    }) => any;
    activeItem?: {
        label: string;
        id: React.ReactText;
    };
    label: string;
}
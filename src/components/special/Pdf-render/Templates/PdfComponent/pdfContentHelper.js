export const getFullname = (props) => {

    const model = { ...props.PdfDataModel.data.profilePersonel };

    let name = "";

    if (typeof model.nom != "undefined") {
        if (model.nom.value) {
            name += model.nom.value;
        }
    }
    name += " ";
    if (typeof model.prenom != "undefined") {
        if (model.prenom.value) {
            name += model.prenom.value;
        }
    }
    return name;
};

export const getDescription = (props) => {

    const model = { ...props.PdfDataModel.data.profilePersonel  };

    let description = "";

    if (typeof model.description != "undefined") {
        if (model.description.value) {
            description += model.description.value;
        }
    }

    return description;

}

export const getAvatarImage = (props) => {
    const model = { ...props.PdfDataModel.data };
    if (typeof model.avatarImage != "undefined") {
        return model.avatarImage;
    } else {
        return "data:image/png;base64,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";
    }
};
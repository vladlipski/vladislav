export function generateOptions(array, labelProperty) {
    return array.map((element) => {
        return ({
            value: element.get('id'),
            label: element.get(labelProperty)
        });
    });
}
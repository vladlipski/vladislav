export function generateOptions(array, labelProperty) {
    return array.map((element) => {
        return ({
            value: element.get('id'),
            label: element.get(labelProperty)
        });
    });
}

export function searchNode(plan, nodeId) {
    if (plan) {
        for (var i = 0; i < plan.length; i++) {
            if (plan[i].id == nodeId) {
                return plan[i];
            }
            const node = searchNode(plan[i].nodes, nodeId);
            if (node) {
                return node;
            }
        }
    }
    return null;
}

export function searchNodeImmutable(plan, nodeId) {
    if (plan) {
        for (var i = 0; i < plan.size; i++) {
            if (plan.get(i).get('id') == nodeId) {
                return plan.get(i);
            }
            const node = searchNodeImmutable(plan.get(i).get('nodes'), nodeId);
            if (node) {
                return node;
            }
        }
    }
    return null;
}
const API = "http://10.0.2.2:3000/projects"

//#region PROJECTS

export const getProjects = async () => {
    const res = await fetch(API)
    return await res.json()
}

export const saveProject = async (newProject) => {
    const res = await fetch(API,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        });
    return await res.json;
}

export const deleteProject = async (id) => {
    await fetch(`${API}/${id}`, {
        method: 'DELETE',

    })
}

//#endregion

//#region PRODUCTS

export const getProducts = async (id) => {
    const res = await fetch(`${API}/${id}/products`)
    return await res.json()
}

export const saveProduct = async (newProduct, project_id) => {
    const res = await fetch(`${API}/${project_id}/products`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
    return await res.json;
}

export const deleteProduct = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/products/${object_id}`, {
        method: 'DELETE',

    })
}

export const getProduct = async (project_id, object_id) => {
    const res = await fetch(`${API}/${project_id}/products/${object_id}`)
    return await res.json()
}

//#endregion

//#region CLIENTS

export const getClients = async (id) => {
    const res = await fetch(`${API}/${id}/clients`)
    return await res.json()
}

export const saveClient = async (newClient, project_id) => {
    const res = await fetch(`${API}/${project_id}/clients`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClient)
        });
    return await res.json;
}

export const deleteClient = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/clients/${object_id}`, {
        method: 'DELETE',

    })
}

export const getClient = async (project_id, object_id) => {
    const res = await fetch(`${API}/${project_id}/clients/${object_id}`)
    return await res.json()
}

//#endregion

//#region SALES

export const getSales = async (id) => {
    const res = await fetch(`${API}/${id}/sales`)
    return await res.json()
}

export const deleteSale = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/sales/${object_id}`, {
        method: 'DELETE',

    })
}

export const getSale = async (project_id, object_id) => {
    const res = await fetch(`${API}/${project_id}/sales/${object_id}`)
    return await res.json()
}

//#endregion

//#region INVESTMENTS

export const getInvestments = async (id) => {
    const res = await fetch(`${API}/${id}/investments`)
    return await res.json()
}

export const saveInvestment = async (newInvestment, project_id) => {
    const res = await fetch(`${API}/${project_id}/investments`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInvestment)
        });
    return await res.json;
}

export const deleteInvestment = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/investments/${object_id}`, {
        method: 'DELETE',

    })
}

//#endregion

//#region ORDERS

export const getOrders = async (id) => {
    const res = await fetch(`${API}/${id}/orders`)
    return await res.json()
}

export const deleteOrder = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/orders/${object_id}`, {
        method: 'DELETE',

    })
}

export const getOrder = async (project_id, object_id) => {
    const res = await fetch(`${API}/${project_id}/orders/${object_id}`)
    return await res.json()
}

//#endregion

//#region CATEGORIES

export const getCategories = async (id) => {
    const res = await fetch(`${API}/${id}/categories`)
    return await res.json()
}

export const deleteCategory = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/categories/${object_id}`, {
        method: 'DELETE',

    })
}

//#endregion

//#region ORDER_PRODUCT_RELATION

export const getOrderProductRelations = async (id) => {
    const res = await fetch(`${API}/${id}/orders/list/all`)
    return await res.json()
}

export const deleteOrderProductRelation = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/orders/list/${object_id}`, {
        method: 'DELETE',

    })
}

//#endregion

//#region SALES_PRODUCT_RELATION

export const getSaleProductRelations = async (id) => {
    const res = await fetch(`${API}/${id}/sales/list/all`)
    return await res.json()
}

export const deleteSaleProductRelation = async (project_id, object_id) => {
    await fetch(`${API}/${project_id}/sales/list/${object_id}`, {
        method: 'DELETE',

    })
}

//#endregion
import apiFetch from "../../services/apiFetch";
import {DANCERS_ENDPOINT, COMPETITIONS_ENDPOINT} from "../../services/api";
const getDataErrors = (data) => {
    return data.reduce((obj, item) => {
        Object.entries(item).map(([key, value]) => {
            obj[key] = value;
        });
        return obj;
    }, {});
};

export const post = async (id, setErrors, e) => {
    console.log(e);
    const { detail: { values, setSubmitting, resetForm } } = e;
    try {
        setErrors({});
        setSubmitting(true);
        const result = await apiFetch.post(`${COMPETITIONS_ENDPOINT}/competitors/${id}/`, {
            withAuth: false,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if(result.statusCode === 400) {
            if(result.data) {
                setErrors(getDataErrors(result.data));
            } else {
                setErrors(result);
            }
            throw result.statusCode;
        } else {
            resetForm();
        }
    } catch(err) {
        setErrors(err);
        throw err;
    } finally {
        setSubmitting(false);
    }
};

export const deleteAct = async (id) => {
    await apiFetch.delete(`${COMPETITIONS_ENDPOINT}/competitor/${id}/`, {withAuth: false});
}

export const fetchCouples = async () => {
    return await apiFetch.get(`${DANCERS_ENDPOINT}/couples/`, {withAuth: false});
}
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

export const useGetformParams = (formParams) => {
    const [formData, setFormData] = useState(formParams);

    // const setFormItem = useCallback(
    //     (key, value) => {
    //         console.log('这里');
    //         setFormData({
    //             ...formData,
    //             [key]: value,
    //         });
    //     },
    //     [formData],
    // );

    const setFormItem = useMemo(
        () => (key, value) => {
            console.log('这里');
            setFormData({
                ...formData,
                [key]: value,
            });
        },
        [formData],
    );
    return [formData, setFormItem] as const;
};

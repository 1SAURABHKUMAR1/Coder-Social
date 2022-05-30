import { useEffect, useState } from 'react';

import date from 'date-and-time';

const ConvertDate = (userDate: string, format: string) => {
    const [dateFormated, setDateFormated] = useState<string>('');

    useEffect(() => {
        userDate && setDateFormated(date.format(new Date(userDate), format));
    }, [format, userDate]);

    return [dateFormated];
};

export default ConvertDate;

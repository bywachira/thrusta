export const washChartData = (chart_data: { usage: number, period: string | number }[], unit?: number): any => {
    let holder: any = {}

    chart_data.forEach((d: any) => {
        const instances = chart_data.filter(item => item.period === d.period).length
        const min_values = chart_data.filter(item => item.period === d.period).map(item => item.usage)
        const max_values = chart_data.filter(item => item.period === d.period).map(item => item.usage)

        // console.log(instances)

        if (holder.hasOwnProperty(d.period)) {
            Object.assign(holder, {
                [d.period]: {
                    total: holder[d.period].total + d.usage,
                    average: (holder[d.period].total + d.usage) / instances,
                    min: Math.min(...min_values),
                    max: Math.max(...max_values)
                }
            })
            // holder[d.period] = holder[d.period] + d.usage
        } else {
            Object.assign(holder, {
                [d.period]: {
                    total: d.usage,
                    average: d.usage,
                    min: d.usage,
                    max: d.usage
                }
            })
        }
    })

    let washedData = []

    for (let prop in holder) {
        washedData.push(!unit ? {
            period: prop,
            min: Math.round(holder[prop].min),
            average: Math.round(holder[prop].average),
            max: Math.round(holder[prop].max),
            total: Math.round(holder[prop].total)
        } : {
                period: prop,
                min: Math.round(holder[prop].min) / unit,
                average: Math.round(holder[prop].average) / unit,
                max: Math.round(holder[prop].max) / unit,
                total: Math.round(holder[prop].total / unit)
            })
    }

    return washedData
}
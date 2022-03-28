import ranks from '../constants/ranks'

export const calculateTitle = (currentExp) => {

    return calculateRank(currentExp)?.title
}

export const calculateRank = (currentExp) => {
    if (!currentExp) return ranks[0]

    let rank

    Object.keys(ranks).forEach(exp => {
        if (currentExp >= exp) rank = ranks[exp]
    })

    return rank || ranks[0]
}
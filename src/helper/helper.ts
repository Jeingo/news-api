/**
 * Description: Transform asc or desc to number for sort
 */
export const makeDirectionToNumber = (val: string): number => (val === 'desc' ? -1 : 1)

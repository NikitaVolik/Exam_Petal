export const statuses = [
  {value: 'new', label: 'Новый'},
  {value: 'active', label: 'Готов к выдаче'},
  {value: 'completed', label: 'Выдан'}
]

export function statusLabel(value) {
  return statuses.find(status => status.value === value)?.label || value
}
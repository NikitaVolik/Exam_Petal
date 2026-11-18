import { useState } from "react";
import { api } from "./api.js";

export default function NewItemPage() {
  const [form, setForm] = useState({
    title: '',
    quantity: '',
    pickup_date: '',
    payment_method: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function change(event) {
    const { name, value } = event.target
    setForm(current => ({ ...current, [name]: value }))
    setMessage('')
  }

  async function submit(event) {
    event.preventDefault()

    if (saving) return

    setSaving(true)
    setError('')
    setErrors({})
    setMessage('')
    
    try {
      const data = await api('/items', {
        method: 'POST',
        body: JSON.stringify({ ...form, quantity: Number(form.quantity) })
      })

      setForm({
        title: '',
        quantity: '',
        pickup_date: '',
        payment_method: ''
      })
      setMessage(`${data.message}. Номер: ${data.id}`)
    } catch (err) {
      setError(err.message)
      setErrors(err.fields || {})
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <h1>Новый заказ</h1>
      <form className="card stack" onSubmit={submit} noValidate>
        <label className="field">
          <span>Букет</span>
          <select
            name="title"
            value={form.title}
            onChange={change}
            required
            disabled={saving}
          >
            <option value="" disabled hidden>Выберите букет</option>
            <option value="Розовые пионы">Розовые пионы</option>
            <option value="Жёлтые тюльпаны">Жёлтые тюльпаны</option>
            <option value="Красные розы">Красные розы</option>
            <option value="Белые ромашки">Белые ромашки</option>
          </select>
          {errors.title && (
            <small className="field-error">{errors.title}</small>
          )}
        </label>
        <label className="field">
          <span>Количество</span>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={change}
            required
            min="1"
            max="10"
            disabled={saving}
          />
          {errors.quantity && (
            <small className="field-error">{errors.quantity}</small>
          )}
        </label>
        <label className="field">
          <span>Дата самовывоза</span>
          <input
            type="text"
            name="pickup_date"
            placeholder="ДД.ММ.ГГГГ"
            value={form.pickup_date}
            onChange={change}
            required
            maxLength={10}
            disabled={saving}
          />
          {errors.pickup_date && (
            <small className="field-error">{errors.pickup_date}</small>
          )}
        </label>
        <label className="field">
          <span>Способ оплаты</span>
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={change}
            required
            disabled={saving}
          >
            <option value="" disabled hidden>Выберите способ оплаты</option>
            <option value="Наличными">Наличными</option>
            <option value="Картой при получении">Картой при получении</option>
          </select>
          {errors.payment_method && (
            <small className="field-error">{errors.payment_method}</small>
          )}
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        {message && <p className="form-message" role="status">{message} <a href="/">Мои заказы</a></p>}
        <button className="btn" disabled={saving}>
          {saving ? "Сохранение.." : "Добавить"}
        </button>
      </form>
    </>
  )
}
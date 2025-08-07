import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    alert("Form submitted!");
  };

  return (
    <div>
      <style>{`
        .contact-form {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
        }

        .contact-form textarea {
          height: 100px;
          resize: vertical;
        }

        .contact-form button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .contact-form button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;

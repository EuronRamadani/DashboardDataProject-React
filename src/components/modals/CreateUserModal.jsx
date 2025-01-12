import React, { useState } from "react";

const CreateUserModal = ({
  show,
  onClose,
  newUser,
  onInputChange,
  onNestedInputChange,
  onCreate,
}) => {
  const [errors, setErrors] = useState({});

  if (!show) return null;

  const validateForm = () => {
    const newErrors = {};
    if (!newUser.name.trim()) newErrors.name = "Name is required.";
    if (!newUser.username.trim()) newErrors.username = "Username is required.";
    if (!newUser.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newUser.email)
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!newUser.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!newUser.address.street.trim())
      newErrors.street = "Street is required.";
    if (!newUser.address.city.trim()) newErrors.city = "City is required.";
    if (!newUser.address.zipcode.trim())
      newErrors.zipcode = "Zip code is required.";
    if (!newUser.company.name.trim())
      newErrors.companyName = "Company name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateForm()) {
      onCreate();
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New User</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={newUser.name}
                  onChange={onInputChange}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={newUser.username}
                  onChange={onInputChange}
                />
                {errors.username && (
                  <small className="text-danger">{errors.username}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={onInputChange}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={newUser.phone}
                  onChange={onInputChange}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.address.street}
                  onChange={(e) => onNestedInputChange(e, "address", "street")}
                />
                {errors.street && (
                  <small className="text-danger">{errors.street}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.address.city}
                  onChange={(e) => onNestedInputChange(e, "address", "city")}
                />
                {errors.city && (
                  <small className="text-danger">{errors.city}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.address.zipcode}
                  onChange={(e) => onNestedInputChange(e, "address", "zipcode")}
                />
                {errors.zipcode && (
                  <small className="text-danger">{errors.zipcode}</small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.company.name}
                  onChange={(e) => onNestedInputChange(e, "company", "name")}
                />
                {errors.companyName && (
                  <small className="text-danger">{errors.companyName}</small>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;

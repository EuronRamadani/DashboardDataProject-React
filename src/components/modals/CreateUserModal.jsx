import React from "react";

const CreateUserModal = ({
  show,
  onClose,
  newUser,
  onInputChange,
  onNestedInputChange,
  onCreate,
}) => {
  if (!show) return null;

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
              </div>
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.address.street}
                  onChange={(e) => onNestedInputChange(e, "address", "street")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.address.city}
                  onChange={(e) => onNestedInputChange(e, "address", "city")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.address.zipcode}
                  onChange={(e) => onNestedInputChange(e, "address", "zipcode")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newUser.company.name}
                  onChange={(e) => onNestedInputChange(e, "company", "name")}
                />
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
              onClick={onCreate}
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

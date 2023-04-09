import { Input } from "antd";

const createRso = () => {
  return (
    <div className="create-rso-form-container">
      <h2>Create a new RSO</h2>
      <form className="form">
        <Input placeholder="Name" maxLength={50} required></Input>
        <Input.TextArea
          placeholder="Add a description for your RSO!"
          maxLength={200}
          rows={6}
        ></Input.TextArea>
        <button>Create</button>
      </form>
    </div>
  );
};

export default createRso;

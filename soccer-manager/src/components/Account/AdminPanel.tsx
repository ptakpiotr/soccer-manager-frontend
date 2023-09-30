import AdminPanelUser from "./AdminPanelUser";

const exampleUsers = [
  {
    userId: "123",
    userEmail: "213",
  },
  {
    userId: "1234",
    userEmail: "2153",
  },
  {
    userId: "1235",
    userEmail: "2143",
  },
];

function AdminPanel() {
  //TODO: api calls
  const deleteUser = (userId: string) => {};
  const blockUser = (userId: string) => {};
  const unBlockUser = (userId: string) => {};

  const funcs = {
    deleteUser,
    blockUser,
    unBlockUser,
  };

  return (
    <>
      {exampleUsers.map((e) => (
        <AdminPanelUser key={`ap-user-${e.userId}`} {...e} {...funcs} />
      ))}
    </>
  );
}

export default AdminPanel;

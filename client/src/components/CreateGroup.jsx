import React, { useState } from "react";
import { createGroup, addGroupToUser } from "../services/groupService";
import { UserAuth } from "../context/AuthContext";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const { user } = UserAuth();

  const handleCreate = async () => {
    if (!groupName || !user) return;
    const groupId = await createGroup(groupName, user.uid);
    await addGroupToUser(user.uid, groupId);
    console.log("Grupo creado con ID:", groupId);
    // Podrías redirigir o mostrar un mensaje
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre del grupo"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button onClick={handleCreate}>Crear grupo</button>
    </div>
  );
};

export default CreateGroup;

// import React, { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// const EditProfile = () => {
//   const [user, setUser] = useState({ name: "", email: "", bio: "" });

//   useEffect(() => {
//     // Загрузка данных пользователя (заглушка)
//     const fetchUser = async () => {
//       const response = await fetch("/api/user"); // Подставьте реальный API
//       const data = await response.json();
//       setUser(data);
//     };
//     fetchUser();
//   }, []);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Отправка обновленных данных
//     await fetch("/api/user", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     });
//   };

//   return (
//     <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl">
//       <CardContent>
//         <h2 className="text-xl font-bold mb-4">Редактирование профиля</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="name">Имя</Label>
//             <Input type="text" name="name" value={user.name} onChange={handleChange} required />
//           </div>
//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input type="email" name="email" value={user.email} onChange={handleChange} required />
//           </div>
//           <div>
//             <Label htmlFor="bio">О себе</Label>
//             <Input type="text" name="bio" value={user.bio} onChange={handleChange} />
//           </div>
//           <Button type="submit" className="w-full">Сохранить</Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default EditProfile;

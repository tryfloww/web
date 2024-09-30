
export const Member = ({ username, img, roleColor, role }) => {
  return <div className="flex justify-between">
    <div className="flex gap-2 items-center">
      <img src={`${img}`} className="rounded-full h-8 w-8" alt="user-1" />
      <p className="text-sm">@{username}</p>
    </div>
    <div className="role flex items-center ">
      <div className="p-2">
        <div style={{ background: roleColor }} className="p-[8px] rounded-full"></div>
      </div>
      <p className="text-sm">{role}</p>
    </div>
  </div>

}

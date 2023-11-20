import { verifyToken } from "@/utils";
import { cookies } from "next/headers";
import mongoose, { HydratedDocument } from "mongoose";
import { IFile , IUser} from "@/app/_config/schemas";
import Link from "next/link";


export function File({file}: {file: HydratedDocument<IFile>}){
  return <>
    <Link href={'/dashboard/view/' + file._id}>{file.fileName}</Link>
  </>
}


export async function FileList() {
  const UserModel = mongoose.model<IUser>("User");

  const payload = await verifyToken();
  if (payload === null) {
    return <p>Not signed in</p>;
  }

  try {
    const user = await UserModel.findById(payload?.userId)
      .populate("files")
      .exec();
    const files = user?.files;

    if (files?.length === 0) {
      return <p>User has not uploaded any files</p>;
    }

    return (
      <div id="fileList">
        <ul>
          {files?.map((file: any) => (
            <li key={file?._id}>
              <File file = {file}></File>
            </li>//make this a file component
          ))}
        </ul>
      </div>
    );
  } catch (err) {
    return <p> Error</p>;
  }
}
import { atom } from "jotai"
import { AddPostPayload } from "../../../entities/posts/model/types"

export const newPostAtom = atom<AddPostPayload>({
  title: "",
  body: "",
  userId: 1,
})


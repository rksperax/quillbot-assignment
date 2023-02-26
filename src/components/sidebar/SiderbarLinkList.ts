import {
  IconHeart,
  IconList,
  IconLogout,
  IconMovie,
  IconPlaylist,
  IconSearch,
  IconSetting,
  IconTvShow,
  IconWatchLater,
} from "../icons";
export default [
  {
    links: [
      { icon: IconSearch, name: "Discover", href: "#", current: true },
      { icon: IconPlaylist, name: "Playlist", href: "#", current: false },
      { icon: IconMovie, name: "Movie", href: "#", current: false },
      { icon: IconTvShow, name: "TV Shows", href: "#", current: false },
      { icon: IconList, name: "My List", href: "#", current: false },
    ],
  },
  {
    links: [
      { icon: IconWatchLater, name: "Watch Later", href: "#", current: false },
      { icon: IconHeart, name: "Recomended", href: "#", current: false },
    ],
  },
  {
    links: [
      { icon: IconSetting, name: "Settings", href: "#", current: false },
      { icon: IconLogout, name: "Logout", href: "#", current: false },
    ],
  },
];

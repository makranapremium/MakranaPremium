import { Award, Clock, Gem, Users } from "lucide-react";
import mongoose from "mongoose";

export const apiDefaults = {
  limit: 12,
  sortMapping: {
    date_added: "createdAt",
    updated: "updatedAt",
    name: "name",
  } as { [index: string]: string },
  orderMapping: {
    asc: 1,
    desc: -1,
    ascending: 1,
    descending: -1,
  } as { [index: string]: number },
};

export const staticCategories = [
  {
    id: new mongoose.Types.ObjectId("686d09a90c8d4186bd551091"),
    name: "luxury marble tables",
    slug: "luxury-marble-tables",
    imageUrl:
      "https://res.cloudinary.com/dhji69hny/image/upload/v1768579966/makrana-premium/zbe2vm5z0evj2ax7ma7v.png",
    createdAt: "2025-07-10T08:13:14.472Z",
    updatedAt: "2025-07-10T08:13:14.472Z",
  },
  {
    id: new mongoose.Types.ObjectId("67e3d9c93b533a116b99d6f8"),
    name: "marble slab",
    slug: "marble-slab",
    imageUrl:
      "https://res.cloudinary.com/dhji69hny/image/upload/v1742985650/makrana-premium/if9uefk6p31kj0memugs.jpg",
    createdAt: "2025-03-26T10:41:13.865Z",
    updatedAt: "2025-03-26T10:41:13.865Z",
  },
  {
    id: new mongoose.Types.ObjectId("6820662bffbc096b3bece839"),
    name: "marble crafts",
    slug: "marble-crafts",
    imageUrl:
      "https://res.cloudinary.com/dhji69hny/image/upload/v1746954452/makrana-premium/bp3bbblnkzx4fxmoboat.jpg",
    createdAt: "2025-05-11T08:56:11.641Z",
    updatedAt: "2025-05-11T09:43:15.057Z",
  },
  {
    id: new mongoose.Types.ObjectId("686f761a56f7bb04e1547a7a"),
    name: "fire palace",
    slug: "fire-palace",
    imageUrl:
      "https://res.cloudinary.com/dhji69hny/image/upload/v1753005288/makrana-premium/qdyzmernbbcgso0sr7av.jpg",
    createdAt: "2025-07-10T08:13:14.472+00:00",
    updatedAt: "2025-07-30T06:23:49.311+00:00",
  },
  {
    id: new mongoose.Types.ObjectId("687cbb70f3bb8b1a5dc659bb"),
    name: "fountain & flooring",
    slug: "fountain-and-flooring",
    imageUrl:
      "https://res.cloudinary.com/dhji69hny/image/upload/v1753004908/makrana-premium/tq7j94qvnwtrmiblzwpl.jpg",
    createdAt: "2025-07-20T09:48:32.344Z",
    updatedAt: "2025-07-20T09:48:32.344Z",
  },
  {
    id: new mongoose.Types.ObjectId("67e3d5743b533a116b99d6ad"),
    name: "basin",
    slug: "basin",
    imageUrl:
      "https://res.cloudinary.com/dhji69hny/image/upload/v1742984541/makrana-premium/bzqfbgzkdtwnn6tbztru.jpg",
    createdAt: "2025-03-26T10:22:44.941Z",
    updatedAt: "2025-03-26T10:22:44.941Z",
  },
];

export const stats = [
  {
    icon: Users,
    number: "1000+",
    label: "Happy Clients",
    description: "Trusted by homeowners and architects",
  },
  {
    icon: Award,
    number: "25+",
    label: "Years Experience",
    description: "Decades of marble craftsmanship",
  },
  {
    icon: Gem,
    number: "500+",
    label: "Projects Completed",
    description: "From residential to commercial",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Expert Support",
    description: "Always here to help you",
  },
];

export const navSections = [
  { name: "home", url: "/" },
  { name: "about", url: "/about" },
  {
    name: "collections",
    url: "/collections",
    hasDropdown: true,
    dropdownItems: [
      { name: "Makrana White", url: "/collections/makrana-white" },
      { name: "Italian Marble", url: "/collections/italian" },
      { name: "Indian Marble", url: "/collections/indian" },
      { name: "Granite", url: "/collections/granite" },
    ],
  },
  { name: "contact us", url: "/contact" },
];

import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Setting from "../models/Setting";
import Contact from "../models/Contact";
import Ticket from "../models/Ticket";
import Whatsapp from "../models/Whatsapp";
import ContactCustomField from "../models/ContactCustomField";
import Message from "../models/Message";
import Queue from "../models/Queue";
import WhatsappQueue from "../models/WhatsappQueue";
import UserQueue from "../models/UserQueue";
import Company from "../models/Company";
import Plan from "../models/Plan";
import TicketNote from "../models/TicketNote";
import QuickMessage from "../models/QuickMessage";
import Help from "../models/Help";
import TicketTraking from "../models/TicketTraking";
import UserRating from "../models/UserRating";
import QueueOption from "../models/QueueOption";
import Schedule from "../models/Schedule";
import Tag from "../models/Tag";
import TicketTag from "../models/TicketTag";
import ContactList from "../models/ContactList";
import ContactListItem from "../models/ContactListItem";
import Campaign from "../models/Campaign";
import CampaignSetting from "../models/CampaignSetting";
import Baileys from "../models/Baileys";
import CampaignShipping from "../models/CampaignShipping";
import Announcement from "../models/Announcement";
import Chat from "../models/Chat";
import ChatUser from "../models/ChatUser";
import ChatMessage from "../models/ChatMessage";
import Invoices from "../models/Invoices";
import Subscriptions from "../models/Subscriptions";
import BaileysChats from "../models/BaileysChats";
import Files from "../models/Files";
import FilesOptions from "../models/FilesOptions";
import Prompt from "../models/Prompt";
import QueueIntegrations from "../models/QueueIntegrations";
import BaileysKeys from "../models/BaileysKeys";

// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
  Company,
  User,
  Contact,
  Ticket,
  Message,
  Whatsapp,
  ContactCustomField,
  Setting,
  Queue,
  WhatsappQueue,
  UserQueue,
  Plan,
  TicketNote,
  QuickMessage,
  Help,
  TicketTraking,
  UserRating,
  QueueOption,
  Schedule,
  Tag,
  TicketTag,
  ContactList,
  ContactListItem,
  Campaign,
  CampaignSetting,
  Baileys,
  CampaignShipping,
  Announcement,
  Chat,
  ChatUser,
  ChatMessage,
  Invoices,
  Subscriptions,
  BaileysChats,
  Files,
  FilesOptions,
  Prompt,
  QueueIntegrations,
  BaileysKeys
];

export async function createInitialData() {
  try {
    await sequelize.sync({ force: true });

    // 👉 Crear plan "Enterprise"
    const [plan] = await Plan.findOrCreate({
      where: { name: "Enterprise" },
      defaults: {
        users: 999,
        connections: 999,
        queues: 999,
        value: 0,
        useSchedules: true,
        useCampaigns: true,
        useInternalChat: true,
        useExternalApi: true,
        useKanban: true,
        useOpenAi: true,
        useIntegrations: true,
        isPublic: false
      }
    });
    console.log("✅ Plan cargado:", plan.name);

    // 👉 Crear compañía principal (ID: 1)
    const [company, createdCompany] = await Company.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: "Empresa Principal",
        phone: "0000000000",
        email: "empresa@principal.com",
        status: true,
        dueDate: "2099-12-31", // Asegura una fecha válida y futura
        recurrence: "mensal", // mensual o anual, como lo manejes tú
        schedules: [],
        planId: plan.id
      }
    });

    if (createdCompany) {
      console.log("✅ Compañía creada:", company.name);
    } else {
      console.log("⚠️  Compañía ya existente:", company.name);
    }

    // 👉 Crear superusuario
    const [user, createdUser] = await User.findOrCreate({
      where: { email: "M@marxmarquinez.com" },
      defaults: {
        name: "marx marquinez",
        email: "M@marxmarquinez.com",
        password: "America000/",
        profile: "admin",
        super: true,
        online: false,
        companyId: company.id
      }
    });

    if (createdUser) {
      console.log("✅ Superusuario creado:", user.email);
    } else {
      console.log("⚠️  El superusuario ya existe:", user.email);
    }
  } catch (err) {
    console.error("❌ Error al crear datos iniciales:", err);
  }
}

sequelize.addModels(models);

createInitialData();
export default sequelize;

/**
 * Icon keyword mappings for semantic search
 * Maps search terms, synonyms, and concepts to icon names
 */

// Maps search keywords to icon names for semantic search
export const iconKeywords: Record<string, string[]> = {
  // ============================================
  // UI ACTIONS
  // ============================================

  // Add / Create / New
  add: ['Plus', 'Plus2', 'PlusCircle', 'PlusSquare', 'FilePlus', 'FolderPlus', 'UserPlus', 'MailPlus', 'CalendarPlus', 'CommentPlus', 'ShoppingBagPlus', 'CartPlus', 'PriceTagPlus', 'ClipboardPlus', 'HousePlus', 'ShieldPlus', 'ShieldPlus2', 'BadgePlus', 'SavePlus'],
  create: ['Plus', 'Plus2', 'PlusCircle', 'PlusSquare', 'FilePlus', 'FolderPlus', 'Edit', 'Pen', 'Pen2', 'Pencil', 'Pencil2'],
  new: ['Plus', 'Plus2', 'PlusCircle', 'PlusSquare', 'FilePlus', 'FolderPlus', 'Sparkles', 'Star'],

  // Remove / Delete / Trash
  remove: ['Minus', 'Minus2', 'MinusCircle', 'MinusSquare', 'Trash', 'X', 'XCircle', 'XCircle2', 'XSquare', 'FileMinus', 'FolderMinus', 'UserMinus', 'CalendarMinus', 'CartMinus', 'ClipboardMinus', 'BadgeMinus', 'ShieldMinus2'],
  delete: ['Trash', 'X', 'XCircle', 'XCircle2', 'XSquare', 'Minus', 'MinusCircle'],
  trash: ['Trash', 'X', 'XCircle', 'XCircle2'],
  discard: ['Trash', 'X', 'XCircle', 'XCircle2'],
  bin: ['Trash'],
  garbage: ['Trash'],

  // Close / Cancel / Exit
  close: ['X', 'XCircle', 'XCircle2', 'XSquare', 'DoorClosed', 'SidebarClose'],
  cancel: ['X', 'XCircle', 'XCircle2', 'XSquare', 'Ban', 'NotAllowed'],
  exit: ['X', 'XCircle', 'DoorOpen', 'ExternalLink', 'ExternalLink2'],
  dismiss: ['X', 'XCircle', 'XCircle2'],
  clear: ['X', 'XCircle', 'Trash', 'Eraser'],

  // Confirm / Accept / Approve
  confirm: ['Check', 'CheckCircle', 'CheckCircle2', 'CheckSquare', 'Ok', 'Approved'],
  accept: ['Check', 'CheckCircle', 'CheckCircle2', 'ThumbsUp', 'Ok', 'Approved'],
  approve: ['Check', 'CheckCircle', 'CheckCircle2', 'ThumbsUp', 'Approved', 'BadgeCheck', 'BadgeCheck2'],
  done: ['Check', 'CheckCircle', 'CheckCircle2', 'Complete', 'TaskCheck'],
  complete: ['Check', 'CheckCircle', 'CheckCircle2', 'Complete', 'TaskCheck', 'CheckSquare'],
  success: ['Check', 'CheckCircle', 'CheckCircle2', 'Ok', 'Approved', 'BadgeCheck'],
  yes: ['Check', 'CheckCircle', 'CheckCircle2', 'ThumbsUp'],

  // Deny / Reject / Decline
  deny: ['X', 'XCircle', 'Ban', 'NotAllowed', 'Rejected'],
  reject: ['X', 'XCircle', 'Ban', 'NotAllowed', 'Rejected', 'ThumbsDown'],
  decline: ['X', 'XCircle', 'ThumbsDown', 'Rejected'],
  no: ['X', 'XCircle', 'Ban', 'NotAllowed', 'ThumbsDown'],

  // Edit / Modify / Change
  edit: ['Edit', 'Pen', 'Pen2', 'PenLine', 'Pencil', 'Pencil2', 'PencilLine', 'PenTool', 'ClipboardEdit'],
  modify: ['Edit', 'Pen', 'Pencil', 'Settings', 'Wrench'],
  change: ['Edit', 'Pen', 'Pencil', 'Refresh', 'Settings'],
  update: ['Edit', 'Pen', 'Pencil', 'Refresh', 'Save', 'Save2'],
  write: ['Edit', 'Pen', 'Pen2', 'Pencil', 'Pencil2', 'PenLine', 'PencilLine'],

  // Save / Store
  save: ['Save', 'Save2', 'SavePlus', 'Download', 'Archive', 'Archive2'],
  storage: ['Save', 'Save2', 'Database', 'Database2', 'Storage', 'Archive'],
  keep: ['Save', 'Save2', 'Bookmark', 'Archive'],
  preserve: ['Save', 'Save2', 'Archive', 'Lock'],

  // Open / Launch / Start
  open: ['FolderOpen', 'DoorOpen', 'MailOpen', 'BookOpen', 'SidebarOpen', 'ExternalLink', 'ExternalLink2', 'Eye', 'Eye2'],
  launch: ['Rocket', 'Play', 'PlayCircle', 'ExternalLink', 'ExternalLink2', 'Zap'],
  start: ['Play', 'PlayCircle', 'Rocket', 'Zap', 'Flag'],
  begin: ['Play', 'PlayCircle', 'Flag'],

  // Search / Find / Look
  search: ['Search', 'SearchPlus', 'SearchMinus', 'Eye', 'Eye2', 'Filter', 'ClipboardSearch'],
  find: ['Search', 'SearchPlus', 'Eye', 'Eye2', 'Filter', 'Crosshair', 'Crosshair2'],
  lookup: ['Search', 'SearchPlus', 'Eye', 'Eye2', 'Book', 'Dictionary'],
  discover: ['Search', 'Compass', 'Compass2', 'Eye', 'Eye2', 'Sparkles'],
  explore: ['Search', 'Compass', 'Compass2', 'Globe', 'Globe2', 'Map'],

  // View / Show / Display
  view: ['Eye', 'Eye2', 'Monitor', 'Screen', 'Presentation', 'Presentation2'],
  show: ['Eye', 'Eye2', 'ArrowsExpand', 'Maximize', 'Maximize2'],
  display: ['Eye', 'Eye2', 'Monitor', 'Screen', 'Tv', 'Presentation'],
  reveal: ['Eye', 'Eye2', 'Spotlight', 'Flashlight'],
  visible: ['Eye', 'Eye2', 'Check', 'CheckCircle'],

  // Hide / Conceal
  hide: ['EyeOff', 'ArrowsCollapse', 'Minimize', 'Minimize2', 'Lock'],
  conceal: ['EyeOff', 'Lock', 'Shield', 'Shield2'],
  invisible: ['EyeOff'],
  hidden: ['EyeOff', 'Lock', 'Shield'],

  // Copy / Duplicate / Clone
  copy: ['Copy', 'Clipboard', 'Clipboard2', 'ClipboardCopy', 'ClipboardCopy2', 'Duplicate', 'Files'],
  duplicate: ['Copy', 'Duplicate', 'Files', 'Clipboard', 'ClipboardCopy'],
  clone: ['Copy', 'Duplicate', 'GitFork', 'Files'],
  paste: ['Clipboard', 'ClipboardPaste2'],

  // Undo / Redo / Reset
  undo: ['Refresh', 'CornerUpLeft', 'CornerUpLeft2', 'History', 'Rewind'],
  redo: ['Refresh', 'CornerUpRight', 'CornerUpRight2', 'FastForward'],
  reset: ['Refresh', 'CornerUpLeft', 'History', 'Trash'],
  revert: ['Refresh', 'History', 'CornerUpLeft', 'CornerUpLeft2'],
  restore: ['Refresh', 'History', 'Archive', 'DatabaseBackup'],

  // Refresh / Reload / Sync
  refresh: ['Refresh', 'Repeat', 'Loader', 'Loading'],
  reload: ['Refresh', 'Repeat', 'Loader', 'Loading'],
  sync: ['Refresh', 'Repeat', 'Cloud', 'ArrowsCollapse'],
  synchronize: ['Refresh', 'Repeat', 'Cloud'],

  // Zoom / Scale
  zoomin: ['SearchPlus', 'SearchMinus', 'Maximize', 'Maximize2', 'Minimize', 'Minimize2', 'ZoomIn', 'ZoomOut'],
  magnify: ['SearchPlus', 'Search', 'Eye', 'Eye2'],
  scale: ['ArrowsExpand', 'ArrowsCollapse', 'Maximize', 'Minimize', 'ResizeDiagonal'],
  resize: ['ArrowsExpand', 'ArrowsCollapse', 'Maximize', 'Minimize', 'ResizeDiagonal', 'ResizeHorizontal', 'ResizeVertical', 'MoveHorizontal'],

  // Expand / Collapse
  expand: ['ArrowsExpand', 'Maximize', 'Maximize2', 'ChevronDown', 'ChevronsDown', 'PlusSquare'],
  collapse: ['ArrowsCollapse', 'Minimize', 'Minimize2', 'ChevronUp', 'ChevronsUp', 'MinusSquare'],
  fullscreen: ['Maximize', 'Maximize2', 'ArrowsExpand', 'ArrowsMaximize2'],
  minimize: ['Minimize', 'Minimize2', 'ArrowsCollapse', 'ArrowsMinimize2'],

  // Sort / Order / Arrange
  sort: ['ArrowUp', 'ArrowDown', 'ChevronsUp', 'ChevronsDown', 'Filter', 'List'],
  order: ['List', 'ArrowUp', 'ArrowDown', 'Reorder'],
  arrange: ['Grid', 'Grid2x2', 'Grid3x3', 'List', 'Layout', 'LayoutGrid', 'LayoutList'],

  // Filter / Refine
  filter: ['Filter', 'Funnel', 'FunnelChart', 'Search', 'Slider', 'SliderHorizontal'],
  refine: ['Filter', 'Funnel', 'FunnelChart', 'Settings'],

  // Select / Choose / Pick
  select: ['Checkbox', 'CheckboxChecked', 'CheckSquare', 'RadioButton', 'RadioChecked', 'CursorClick', 'Pointer2'],
  choose: ['Checkbox', 'CheckboxChecked', 'CheckSquare', 'RadioButton', 'RadioChecked'],
  pick: ['Checkbox', 'CheckboxChecked', 'CursorClick', 'Pointer2', 'Hand'],

  // Drag / Drop / Move
  drag: ['Grab', 'Grabbing', 'GrabCursor', 'MoveHorizontal', 'MoveCursor'],
  drop: ['Grab', 'Grabbing', 'Download', 'ArrowDown'],
  move: ['MoveCursor', 'MoveHorizontal', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Grab', 'Grabbing'],

  // Toggle / Switch
  toggle: ['Toggle', 'ToggleLeft', 'ToggleRight', 'SwitchOn', 'SwitchOff'],
  switch: ['Toggle', 'ToggleLeft', 'ToggleRight', 'SwitchOn', 'SwitchOff', 'Refresh'],

  // ============================================
  // COMMUNICATION
  // ============================================

  // Email / Mail
  email: ['Mail', 'MailCheck', 'MailOpen', 'MailPlus', 'Mailbox', 'Envelope2', 'Inbox', 'Send', 'Send2', 'AtSign'],
  mail: ['Mail', 'MailCheck', 'MailOpen', 'MailPlus', 'Mailbox', 'Envelope2', 'Inbox'],
  inbox: ['Inbox', 'Mail', 'Mailbox', 'Envelope2'],
  outbox: ['Send', 'Send2', 'Mail', 'MailOpen'],
  envelope: ['Mail', 'Envelope2', 'MailOpen', 'MailPlus'],
  letter: ['Mail', 'Envelope2', 'FileText', 'Paperclip'],

  // Message / Chat / Comment
  message: ['MessageCircle', 'MessageSquare', 'MessagesSquare', 'MessageAi', 'Comment', 'Send', 'Send2'],
  chat: ['MessageCircle', 'MessageSquare', 'MessagesSquare', 'Comment', 'CommentCheck', 'CommentPlus'],
  comment: ['Comment', 'CommentCheck', 'CommentPlus', 'CommentX', 'MessageCircle', 'MessageSquare'],
  conversation: ['MessageCircle', 'MessageSquare', 'MessagesSquare', 'Users'],
  discuss: ['MessageCircle', 'MessagesSquare', 'Comment', 'Users'],
  reply: ['MessageCircle', 'MessageSquare', 'CornerUpLeft', 'Send', 'Send2'],
  dm: ['MessageCircle', 'MessageSquare', 'Send', 'Send2'],
  direct: ['MessageCircle', 'MessageSquare', 'Send', 'Send2', 'ArrowRight'],

  // Call / Phone
  call: ['Phone', 'PhoneCall', 'PhoneIncoming', 'PhoneOutgoing', 'PhoneMissed'],
  phone: ['Phone', 'PhoneCall', 'PhoneOff', 'PhoneIncoming', 'PhoneOutgoing', 'PhoneMissed', 'Smartphone'],
  dial: ['Phone', 'PhoneCall', 'Dial', 'SpeedDial'],
  ring: ['Phone', 'PhoneCall', 'Bell', 'BellRing'],
  voicemail: ['Voicemail', 'Phone', 'Mic'],
  contact: ['Contact', 'Contact2', 'User', 'UserCircle', 'Phone', 'Mail'],
  telephone: ['Phone', 'PhoneCall'],

  // Notification / Alert
  notification: ['Bell', 'BellRing', 'AlertCircle', 'AlertCircle2', 'Info', 'InfoCircle'],
  alert: ['AlertCircle', 'AlertCircle2', 'AlertTriangle', 'AlertOctagon', 'Bell', 'BellRing'],
  notify: ['Bell', 'BellRing', 'AlertCircle', 'Send'],
  reminder: ['Bell', 'BellRing', 'Reminder', 'AlarmClock', 'Clock'],

  // Send / Share
  send: ['Send', 'Send2', 'Mail', 'Share', 'Share2', 'ShareForward', 'Upload'],
  share: ['Share', 'Share2', 'ShareForward', 'ExternalLink', 'ExternalLink2', 'Link', 'Send'],
  forward: ['ShareForward', 'Send', 'Send2', 'ArrowRight', 'FastForward'],
  broadcast: ['Broadcast', 'Radio', 'Wifi', 'Share', 'Share2'],

  // Social
  mention: ['Mention', 'Mention2', 'AtSign', 'Hash', 'Hashtag'],
  tag: ['Tag', 'Tag2', 'Tags', 'Hash', 'Hashtag', 'Hashtag2', 'TagPerson', 'AtSign'],
  hashtag: ['Hash', 'Hashtag', 'Hashtag2', 'Tag'],
  at: ['AtSign', 'Mention', 'Mention2', 'Mail'],

  // ============================================
  // MEDIA & PLAYBACK
  // ============================================

  // Play / Pause / Stop
  play: ['Play', 'PlayCircle', 'Video', 'Video2', 'Music'],
  pause: ['Pause', 'PauseCircle'],
  stop: ['StopCircle', 'Square', 'X'],
  resume: ['Play', 'PlayCircle'],

  // Forward / Rewind / Skip
  fastforward: ['FastForward', 'SkipForward', 'ChevronsRight'],
  rewind: ['Rewind', 'SkipBack', 'ChevronsLeft'],
  skip: ['SkipForward', 'SkipBack', 'FastForward', 'Rewind'],
  next: ['SkipForward', 'ArrowRight', 'ChevronsRight'],
  previous: ['SkipBack', 'ArrowLeft', 'ChevronsLeft'],

  // Volume / Sound / Audio
  volume: ['Volume', 'Volume1', 'Volume2', 'VolumeOff', 'VolumeX', 'VolumeDial', 'Speaker', 'Speaker2', 'Speaker3'],
  sound: ['Volume', 'Volume1', 'Volume2', 'Speaker', 'Speaker2', 'Speaker3', 'Music', 'AudioLines', 'Waveform'],
  audio: ['Volume', 'Volume1', 'Volume2', 'Speaker', 'Speaker2', 'Headphones', 'Music', 'AudioLines', 'Waveform', 'AudioDescription', 'Mic'],
  mute: ['VolumeOff', 'VolumeX', 'MicOff', 'BellOff'],
  unmute: ['Volume', 'Volume1', 'Volume2', 'Mic', 'Bell'],
  loud: ['Volume2', 'Speaker3', 'BellRing'],
  quiet: ['Volume1', 'VolumeOff'],
  silent: ['VolumeOff', 'VolumeX', 'BellOff', 'MicOff'],

  // Music / Song
  music: ['Music', 'Music2', 'Music3', 'Music4', 'Headphones', 'Disc', 'Disc2', 'Disc3', 'Vinyl', 'Playlist'],
  song: ['Music', 'Music2', 'Playlist', 'Disc'],
  track: ['Music', 'Music2', 'Playlist', 'Disc', 'Record'],
  album: ['Disc', 'Disc2', 'Disc3', 'Music', 'Vinyl', 'Playlist'],
  artist: ['Music', 'Mic', 'Headphones', 'User'],
  playlist: ['Playlist', 'Music', 'List', 'Queue'],

  // Video / Movie / Film
  video: ['Video', 'Video2', 'VideoOff', 'Film', 'Film2', 'FilmSlate', 'CameraMovie', 'Camera', 'Tv'],
  movie: ['Film', 'Film2', 'FilmSlate', 'CameraMovie', 'Video', 'Tv', 'Cinema'],
  film: ['Film', 'Film2', 'FilmSlate', 'CameraMovie', 'Video'],
  cinema: ['Cinema', 'Film', 'FilmSlate', 'Ticket'],
  theater: ['Cinema', 'Film', 'FilmSlate', 'Ticket'],
  tv: ['Tv', 'Monitor', 'Screen', 'Video', 'Film'],
  television: ['Tv', 'Monitor', 'Screen'],

  // Streaming / Recording
  stream: ['Stream', 'Live', 'LiveStream', 'Broadcast', 'Video', 'Wifi'],
  live: ['Live', 'LiveStream', 'Stream', 'Broadcast', 'Record'],
  record: ['Record', 'Video', 'Mic', 'Circle'],
  recording: ['Record', 'Video', 'Mic', 'Circle'],
  podcast: ['Podcast', 'Mic', 'Headphones', 'Radio'],
  radio: ['Radio', 'Broadcast', 'Podcast', 'Music'],

  // Camera / Photo
  camera: ['Camera', 'CameraMovie', 'Webcam', 'Video'],
  photo: ['Camera', 'FileImage', 'PictureFrame'],
  picture: ['Camera', 'FileImage', 'PictureFrame'],
  image: ['Camera', 'FileImage', 'PictureFrame'],
  screenshot: ['Camera', 'Monitor', 'Screen', 'Scan'],
  snapshot: ['Camera', 'Scan'],

  // Microphone
  microphone: ['Mic', 'MicOff', 'Podcast', 'Record'],
  mic: ['Mic', 'MicOff', 'Podcast', 'Record'],
  voice: ['Mic', 'Podcast', 'VoiceControl', 'AudioLines'],

  // ============================================
  // NAVIGATION
  // ============================================

  // Home / Back / Forward
  home: ['Home', 'House2', 'HouseCheck', 'HouseCog', 'HouseHeart', 'HousePlus', 'Building'],
  house: ['Home', 'House2', 'HouseCheck', 'HouseCog', 'HouseHeart', 'HousePlus', 'Building'],
  back: ['ArrowLeft', 'ChevronsLeft', 'CornerUpLeft', 'CornerUpLeft2', 'SkipBack', 'Rewind'],
  up: ['ArrowUp', 'ChevronUp', 'ChevronsUp', 'ArrowUpCircle', 'ArrowUpCircle2', 'ArrowUpSquare', 'CornerUpLeft', 'CornerUpRight'],
  down: ['ArrowDown', 'ChevronDown', 'ChevronsDown', 'ArrowDownCircle', 'ArrowDownCircle2', 'ArrowDownSquare', 'CornerDownLeft', 'CornerDownRight'],
  left: ['ArrowLeft', 'ChevronsLeft', 'ArrowLeftCircle', 'ArrowLeftCircle2', 'ArrowLeftSquare', 'CornerUpLeft', 'CornerDownLeft', 'PointLeft'],
  right: ['ArrowRight', 'ChevronsRight', 'ArrowRightCircle', 'ArrowRightCircle2', 'ArrowRightSquare', 'CornerUpRight', 'CornerDownRight', 'PointRight'],

  // Menu / Navigation
  menu: ['Menu', 'MenuDots', 'MenuDotsHorizontal', 'MenuGrid', 'MoreHorizontal', 'List'],
  hamburger: ['Menu', 'List'],
  kebab: ['MenuDots', 'MoreHorizontal'],
  meatball: ['MenuDotsHorizontal', 'MoreHorizontal'],
  dots: ['MenuDots', 'MenuDotsHorizontal', 'MoreHorizontal'],
  more: ['MoreHorizontal', 'MenuDots', 'MenuDotsHorizontal', 'Plus', 'PlusCircle'],
  options: ['Settings', 'MenuDots', 'MenuDotsHorizontal', 'MoreHorizontal', 'Slider', 'SliderHorizontal'],
  nav: ['Menu', 'Navigation', 'Navigation2', 'Compass', 'Map'],
  navigation: ['Navigation', 'Navigation2', 'Menu', 'Compass', 'Map', 'MapPin', 'Directions'],

  // Map / Location / GPS
  map: ['Map', 'MapPin', 'MapPinned', 'Globe', 'Globe2', 'Compass', 'Navigation'],
  location: ['MapPin', 'MapPinned', 'Navigation', 'Navigation2', 'Compass', 'Globe', 'Crosshair'],
  gps: ['Navigation', 'Navigation2', 'MapPin', 'Crosshair', 'Compass'],
  pin: ['MapPin', 'MapPinned', 'Bookmark', 'Paperclip'],
  marker: ['MapPin', 'MapPinned', 'Marker', 'Bookmark'],
  directions: ['Directions', 'Navigation', 'Navigation2', 'Map', 'Route', 'Signpost'],
  route: ['Route', 'Directions', 'Map', 'Navigation', 'Waypoints'],

  // Sidebar / Panel
  sidebar: ['Sidebar', 'SidebarOpen', 'SidebarClose', 'PanelLeft', 'PanelRight'],
  panel: ['PanelLeft', 'PanelRight', 'PanelBottom', 'PanelTop', 'Sidebar', 'Layout'],

  // ============================================
  // FILES & DOCUMENTS
  // ============================================

  // File / Document
  file: ['File', 'FileText', 'FilePlus', 'FileMinus', 'FileCheck', 'FileX', 'FileArchive', 'FileAudio', 'FileCode', 'FileImage', 'FileVideo', 'Files'],
  document: ['File', 'FileText', 'Files', 'DocumentPrinter', 'Notebook', 'Notebook2'],
  doc: ['File', 'FileText', 'FileCode', 'Notebook'],
  paper: ['File', 'FileText', 'Paperclip', 'Paperclip2'],
  page: ['File', 'FileText', 'PageSetup', 'Notebook'],

  // Folder / Directory
  folder: ['Folder', 'FolderPlus', 'FolderMinus', 'FolderOpen', 'Archive', 'Archive2'],
  directory: ['Folder', 'FolderPlus', 'FolderMinus', 'FolderOpen'],
  organize: ['Folder', 'FolderPlus', 'Archive', 'Tags', 'Filter'],

  // Download / Upload
  download: ['Download', 'ArrowDown', 'ArrowDownCircle', 'Save', 'CloudRain'],
  upload: ['Upload', 'ArrowUp', 'ArrowUpCircle', 'CloudSun', 'Send'],
  import: ['Download', 'ArrowDown', 'Upload', 'Inbox'],
  export: ['Upload', 'ArrowUp', 'Download', 'ExternalLink', 'Share'],

  // Attach / Clip
  attach: ['Paperclip', 'Paperclip2', 'Link', 'Pin'],
  attachment: ['Paperclip', 'Paperclip2', 'Link', 'File'],
  clip: ['Paperclip', 'Paperclip2', 'Clipboard', 'Clipboard2'],

  // Archive / Compress
  archive: ['Archive', 'Archive2', 'FileArchive', 'Folder', 'Package'],
  zip: ['FileArchive', 'Archive', 'Package'],
  compress: ['FileArchive', 'Archive', 'ArrowsCollapse'],
  extract: ['FileArchive', 'Archive', 'ArrowsExpand'],

  // Clipboard
  clipboard: ['Clipboard', 'Clipboard2', 'ClipboardCheck', 'ClipboardCheck2', 'ClipboardList', 'ClipboardList2', 'ClipboardCopy', 'ClipboardCopy2', 'ClipboardPaste2', 'ClipboardData', 'ClipboardEdit', 'ClipboardHeart', 'ClipboardMinus', 'ClipboardPlus', 'ClipboardSearch', 'ClipboardSignature', 'ClipboardText', 'ClipboardX2'],

  // ============================================
  // USERS & ACCOUNTS
  // ============================================

  // Person / User / Account
  person: ['User', 'UserCircle', 'Users', 'Contact', 'Contact2'],
  user: ['User', 'UserCircle', 'Users', 'UserPlus', 'UserMinus', 'UserX', 'UserCheck', 'UserCog'],
  account: ['User', 'UserCircle', 'Key', 'KeyRound', 'Lock', 'Settings'],
  profile: ['User', 'UserCircle', 'Contact', 'Contact2', 'IdCard', 'Badge2'],
  avatar: ['User', 'UserCircle', 'Circle'],
  member: ['User', 'UserCircle', 'Users', 'Team', 'Badge2'],
  people: ['Users', 'User', 'UserCircle', 'Team'],
  group: ['Users', 'Team', 'Meeting'],
  team: ['Team', 'Users', 'Meeting', 'Handshake'],

  // Admin / Settings
  admin: ['UserCog', 'Settings', 'Shield', 'Key', 'Crown'],
  administrator: ['UserCog', 'Settings', 'Shield', 'Key', 'Crown'],
  moderator: ['UserCog', 'Shield', 'Settings', 'Badge2'],
  owner: ['Crown', 'Key', 'UserCog', 'Shield'],
  manager: ['UserCog', 'Settings', 'Briefcase2', 'Team'],

  // ============================================
  // STATUS & FEEDBACK
  // ============================================

  // Success / Error / Warning / Info
  error: ['XCircle', 'XCircle2', 'AlertCircle', 'AlertCircle2', 'AlertTriangle', 'AlertOctagon', 'Bug', 'X'],
  warning: ['AlertTriangle', 'AlertCircle', 'AlertCircle2', 'AlertOctagon', 'Info'],
  info: ['Info', 'InfoCircle', 'HelpCircle', 'Lightbulb', 'AlertCircle'],
  information: ['Info', 'InfoCircle', 'HelpCircle', 'Lightbulb'],
  help: ['HelpCircle', 'Info', 'InfoCircle', 'Lightbulb', 'BadgeHelp', 'HelpCursor'],
  question: ['HelpCircle', 'BadgeHelp', 'HelpCursor'],

  // Loading / Progress
  loading: ['Loader', 'Loading', 'Refresh', 'Hourglass', 'Clock', 'WaitCursor'],
  progress: ['Progress', 'Loader', 'Loading', 'BarChart', 'Gauge', 'Hourglass'],
  spinner: ['Loader', 'Loading', 'Refresh'],
  waiting: ['Loader', 'Loading', 'Hourglass', 'Clock', 'WaitCursor', 'Pending'],
  pending: ['Pending', 'Clock', 'Hourglass', 'Loader', 'Loading'],

  // Online / Offline
  online: ['Wifi', 'Signal', 'SignalHigh', 'Globe', 'Cloud', 'Check', 'CheckCircle'],
  offline: ['WifiOff', 'SignalZero', 'Cloud', 'X', 'XCircle'],
  connected: ['Wifi', 'Signal', 'Link', 'Chain', 'Check'],
  disconnected: ['WifiOff', 'SignalZero', 'Link2Off', 'ChainBroken', 'X'],

  // Verified / Unverified
  verified: ['Verified', 'Verified2', 'BadgeCheck', 'BadgeCheck2', 'CheckCircle', 'ShieldCheck'],
  unverified: ['Unverified', 'HelpCircle', 'AlertCircle', 'X'],
  authentic: ['Verified', 'Verified2', 'BadgeCheck', 'BadgeCheck2', 'ShieldCheck'],
  certified: ['Verified', 'BadgeCheck', 'Certificate', 'Certificate2', 'Award'],

  // ============================================
  // SETTINGS & CONFIGURATION
  // ============================================

  // Settings / Config / Preferences
  settings: ['Settings', 'Slider', 'SliderHorizontal', 'SliderVertical', 'Wrench', 'UserCog', 'HouseCog', 'ServerCog'],
  config: ['Settings', 'Slider', 'SliderHorizontal', 'Wrench', 'Code', 'Terminal'],
  configuration: ['Settings', 'Slider', 'SliderHorizontal', 'Wrench', 'Code'],
  preferences: ['Settings', 'Slider', 'SliderHorizontal', 'User', 'UserCog'],
  gear: ['Settings', 'UserCog', 'ServerCog', 'HouseCog', 'BrainCog'],
  cog: ['Settings', 'UserCog', 'ServerCog', 'HouseCog', 'BrainCog'],

  // Tools / Utilities
  tool: ['Wrench', 'Hammer', 'Screwdriver', 'Toolbox', 'Settings'],
  tools: ['Toolbox', 'Wrench', 'Hammer', 'Screwdriver', 'Settings'],
  utility: ['Wrench', 'Settings', 'Toolbox'],
  wrench: ['Wrench', 'Settings', 'Toolbox'],

  // ============================================
  // SECURITY & PRIVACY
  // ============================================

  // Lock / Unlock / Security
  lock: ['Lock', 'LockKeyhole', 'LockOpen', 'Unlock', 'ShieldLock', 'Key'],
  unlock: ['Unlock', 'LockOpen', 'ShieldUnlock', 'Key'],
  secure: ['Lock', 'Shield', 'Shield2', 'ShieldCheck', 'Key', 'Fingerprint'],
  security: ['Shield', 'Shield2', 'ShieldCheck', 'Lock', 'Key', 'Fingerprint', 'FaceId'],
  privacy: ['Lock', 'Shield', 'EyeOff', 'Key', 'Fingerprint'],
  protect: ['Shield', 'Shield2', 'ShieldCheck', 'Lock', 'Protection', 'Guard'],
  protection: ['Shield', 'Shield2', 'Protection', 'Guard', 'Armor', 'Fortress'],

  // Key / Password / Authentication
  key: ['Key', 'KeyRound', 'KeySquare', 'Lock', 'Fingerprint'],
  password: ['Key', 'KeyRound', 'Lock', 'LockKeyhole', 'EyeOff', 'Fingerprint'],
  login: ['Key', 'Lock', 'User', 'UserCircle', 'DoorOpen'],
  logout: ['Key', 'Lock', 'DoorOpen', 'ExternalLink', 'X'],
  signin: ['Key', 'Lock', 'User', 'DoorOpen'],
  signout: ['Key', 'Lock', 'DoorOpen', 'ExternalLink'],
  authenticate: ['Key', 'Fingerprint', 'FaceId', 'Lock', 'Shield', 'TwoFactor'],
  authentication: ['Key', 'Fingerprint', 'FaceId', 'Lock', 'Shield', 'TwoFactor'],
  twofactor: ['TwoFactor', 'Key', 'Shield', 'Lock', 'Smartphone'],
  biometric: ['Fingerprint', 'FaceId', 'ScanFace', 'Eye'],

  // Encrypt / Decrypt
  encrypt: ['Lock', 'Shield', 'Key', 'Code'],
  decrypt: ['Unlock', 'LockOpen', 'Key'],

  // Block / Ban
  block: ['Block', 'Block2', 'Ban', 'NotAllowed', 'XCircle', 'Shield'],
  ban: ['Ban', 'NotAllowed', 'Block', 'Block2', 'X', 'XCircle'],
  forbidden: ['Ban', 'NotAllowed', 'Block', 'Lock', 'X'],
  restrict: ['Lock', 'Ban', 'NotAllowed', 'Shield', 'Filter'],

  // ============================================
  // SHOPPING & E-COMMERCE
  // ============================================

  // Cart / Basket / Bag
  cart: ['ShoppingCart', 'CartCheck', 'CartMinus', 'CartPlus', 'CartX', 'Basket'],
  basket: ['Basket', 'ShoppingCart', 'ShoppingBag'],
  bag: ['ShoppingBag', 'ShoppingBagPlus', 'Basket', 'Backpack', 'Backpack2'],
  shop: ['ShoppingCart', 'ShoppingBag', 'Store', 'StoreFront', 'Basket'],
  store: ['Store', 'StoreFront', 'ShoppingCart', 'ShoppingBag', 'Building'],
  ecommerce: ['ShoppingCart', 'ShoppingBag', 'Store', 'CreditCard', 'DollarSign'],

  // Payment / Money / Currency
  payment: ['CreditCard', 'DollarSign', 'Wallet', 'WalletCards', 'Banknote', 'Coins'],
  pay: ['CreditCard', 'DollarSign', 'Wallet', 'Banknote'],
  money: ['DollarSign', 'Banknote', 'Coins', 'Coin', 'Wallet', 'PiggyBank', 'Bank'],
  currency: ['DollarSign', 'Banknote', 'Coins', 'Bitcoin'],
  dollar: ['DollarSign', 'Banknote', 'Wallet'],
  cash: ['Banknote', 'DollarSign', 'Wallet', 'Coins'],
  credit: ['CreditCard', 'Wallet', 'WalletCards', 'DollarSign'],
  card: ['CreditCard', 'WalletCards', 'IdCard', 'BusinessCard'],
  wallet: ['Wallet', 'WalletCards', 'CreditCard', 'Banknote'],

  // Price / Discount / Sale
  price: ['Tag', 'Tag2', 'PriceTag', 'DollarSign', 'Percent'],
  discount: ['Percent', 'Percentage', 'Discount', 'Tag', 'BadgePercent', 'Coupon'],
  sale: ['Tag', 'Tag2', 'PriceTag', 'Percent', 'Discount', 'Coupon'],
  coupon: ['Coupon', 'Ticket', 'Tag', 'Percent', 'BadgePercent'],
  promo: ['Coupon', 'Tag', 'Percent', 'Gift', 'Star'],

  // Order / Receipt / Invoice
  receipt: ['Receipt', 'Receipt2', 'ReceiptCheck', 'ReceiptX', 'FileText'],
  invoice: ['Invoice', 'Receipt', 'FileText', 'DollarSign'],
  bill: ['Receipt', 'Receipt2', 'Invoice', 'FileText', 'DollarSign'],

  // Shipping / Delivery
  shipping: ['Shipping', 'ShippingFast', 'Truck', 'Package'],
  delivery: ['Truck', 'Shipping', 'ShippingFast', 'Package'],
  package: ['Package', 'Archive', 'Gift', 'Truck'],

  // ============================================
  // DATA & ANALYTICS
  // ============================================

  // Chart / Graph / Report
  chart: ['BarChart', 'BarChart2', 'BarChartHorizontal', 'LineChart', 'PieChart', 'PieChart2', 'AreaChart', 'DonutChart'],
  graph: ['BarChart', 'LineChart', 'PieChart', 'AreaChart', 'TrendingUp', 'TrendingDown', 'Activity'],
  report: ['Report', 'FileText', 'BarChart', 'PieChart', 'ClipboardData', 'Presentation'],
  analytics: ['Analytics', 'BarChart', 'LineChart', 'PieChart', 'TrendingUp', 'Statistics', 'Dashboard'],
  statistics: ['Statistics', 'BarChart', 'LineChart', 'PieChart', 'Analytics', 'Percent'],
  metrics: ['Metric', 'Gauge', 'BarChart', 'Statistics', 'Analytics', 'Dashboard'],
  data: ['Database', 'Database2', 'BarChart', 'Table', 'Table2', 'ClipboardData'],
  dashboard: ['Dashboard', 'LayoutGrid', 'Grid', 'BarChart', 'Widget', 'Analytics'],

  // Trend / Growth / Increase / Decrease
  trend: ['TrendingUp', 'TrendingDown', 'Trending', 'LineChart', 'Activity'],
  trending: ['Trending', 'TrendingUp', 'TrendingDown', 'Flame', 'Zap'],
  growth: ['Growth', 'TrendingUp', 'ArrowUp', 'BarChart', 'LineChart'],
  increase: ['TrendingUp', 'ArrowUp', 'Plus', 'PlusCircle', 'Growth', 'Uptrend'],
  decrease: ['TrendingDown', 'ArrowDown', 'Minus', 'MinusCircle', 'Downtrend'],
  rise: ['TrendingUp', 'ArrowUp', 'Growth', 'Uptrend'],
  fall: ['TrendingDown', 'ArrowDown', 'Downtrend'],

  // Table / Database
  table: ['Table', 'Table2', 'Grid', 'Grid2x2', 'Grid3x3', 'List', 'Database'],
  database: ['Database', 'Database2', 'DatabaseBackup', 'DatabaseZap', 'Server', 'HardDrive'],
  harddrive: ['Storage', 'Database', 'HardDrive', 'HardDrive2', 'Ssd', 'Server'],

  // ============================================
  // TIME & DATE
  // ============================================

  // Time / Clock / Schedule
  time: ['Clock', 'Timer', 'Stopwatch', 'AlarmClock', 'Hourglass', 'Watch', 'History'],
  clock: ['Clock', 'AlarmClock', 'Timer', 'Watch', 'History'],
  timer: ['Timer', 'Stopwatch', 'Clock', 'AlarmClock', 'Hourglass', 'Pomodoro'],
  alarm: ['AlarmClock', 'Bell', 'BellRing', 'Clock', 'Timer'],
  schedule: ['Schedule', 'Schedule2', 'Calendar', 'CalendarDays', 'Clock', 'List'],
  appointment: ['Calendar', 'CalendarCheck', 'Clock', 'Schedule', 'Reservation'],

  // Calendar / Date / Event
  calendar: ['Calendar', 'CalendarCheck', 'CalendarDays', 'CalendarMinus', 'CalendarPlus', 'CalendarX'],
  date: ['Calendar', 'CalendarDays', 'Clock'],
  event: ['Calendar', 'CalendarCheck', 'Bell', 'Star', 'Ticket'],
  deadline: ['Deadline', 'Calendar', 'CalendarX', 'Clock', 'AlertTriangle', 'Timer'],
  due: ['DueDate', 'Calendar', 'Clock', 'AlertCircle'],

  // History / Past / Recent
  history: ['History', 'Clock', 'Rewind', 'CornerUpLeft', 'Archive'],
  past: ['History', 'Rewind', 'CornerUpLeft', 'Archive'],
  recent: ['History', 'Clock', 'List', 'Activity'],
  future: ['Future', 'ArrowRight', 'FastForward', 'Calendar'],

  // ============================================
  // DEVELOPMENT & CODE
  // ============================================

  // Code / Programming
  code: ['Code', 'Code2', 'CodeBlock', 'CodeSquare', 'Terminal', 'Terminal2', 'FileCode'],
  programming: ['Code', 'Code2', 'Terminal', 'Terminal2', 'Bug', 'GitBranch'],
  developer: ['Code', 'Terminal', 'Bug', 'GitBranch', 'Laptop'],
  coding: ['Code', 'Code2', 'Terminal', 'Keyboard'],

  // Terminal / Console / Command
  terminal: ['Terminal', 'Terminal2', 'TerminalSquare', 'Command', 'Code'],
  console: ['Terminal', 'Terminal2', 'TerminalSquare', 'Code', 'Monitor'],
  command: ['Command', 'Terminal', 'Terminal2', 'Code'],
  cli: ['Terminal', 'Terminal2', 'Command', 'Code'],
  shell: ['Terminal', 'Terminal2', 'Command'],

  // Bug / Debug / Issue
  bug: ['Bug', 'AlertCircle', 'AlertTriangle', 'Search', 'Code'],
  debug: ['Bug', 'Search', 'Code', 'Terminal', 'Eye'],
  issue: ['Bug', 'AlertCircle', 'AlertTriangle', 'GitPullRequest'],

  // Git / Version Control
  git: ['GitBranch', 'GitCommit', 'GitFork', 'GitMerge', 'GitPullRequest', 'Github', 'Branch'],
  branch: ['GitBranch', 'Branch', 'GitFork', 'Tree'],
  commit: ['GitCommit', 'Check', 'Save'],
  merge: ['GitMerge', 'GitPullRequest', 'ArrowsCollapse'],
  fork: ['GitFork', 'Branch', 'Copy'],
  pullrequest: ['GitPullRequest', 'GitMerge', 'Code'],
  pr: ['GitPullRequest', 'GitMerge', 'Code'],

  // API / Integration
  api: ['Api', 'Code', 'Webhook', 'Link', 'Server'],
  webhook: ['Webhook', 'Api', 'Link', 'Code', 'ArrowRight'],
  integration: ['Link', 'Api', 'Webhook', 'Puzzle', 'PuzzlePiece'],

  // ============================================
  // DEVICES & HARDWARE
  // ============================================

  // Computer / Laptop / Desktop
  computer: ['Laptop', 'Monitor', 'Desktop', 'Screen', 'Cpu'],
  laptop: ['Laptop', 'Monitor', 'Screen'],
  desktop: ['Desktop', 'Monitor', 'Screen', 'Laptop'],
  pc: ['Desktop', 'Monitor', 'Laptop', 'Cpu'],
  mac: ['Laptop', 'Monitor', 'Desktop', 'Apple'],

  // Mobile / Phone / Tablet
  mobile: ['Smartphone', 'Tablet', 'Phone', 'Watch'],
  smartphone: ['Smartphone', 'Phone', 'PhoneCall'],
  tablet: ['Tablet', 'Smartphone', 'Screen'],
  ipad: ['Tablet', 'Screen'],
  iphone: ['Smartphone', 'Phone'],

  // Server / Cloud
  server: ['Server', 'Server2', 'ServerCog', 'ServerCrash', 'ServerOff', 'Database', 'Cloud'],
  cloud: ['Cloud', 'CloudRain', 'CloudSnow', 'CloudSun', 'Server', 'Upload', 'Download'],
  hosting: ['Server', 'Server2', 'Cloud', 'Database'],

  // Network / Internet / Wifi
  network: ['Wifi', 'WifiOff', 'Router', 'Globe', 'Signal', 'Server'],
  internet: ['Globe', 'Globe2', 'Wifi', 'Router', 'Cloud'],
  wifi: ['Wifi', 'WifiOff', 'Signal', 'Router'],
  bluetooth: ['Bluetooth', 'Wifi', 'Signal'],
  signal: ['Signal', 'SignalHigh', 'SignalLow', 'SignalZero', 'Wifi'],

  // Printer / Scanner
  printer: ['Printer', 'Printer2', 'PrinterCheck', 'PrinterX', 'DocumentPrinter'],
  print: ['Printer', 'Printer2', 'PrinterCheck', 'PrintPreview', 'PrintQueue'],
  scanner: ['Scanner', 'Scanner2', 'Scan', 'Scan2'],
  scan: ['Scan', 'Scan2', 'ScanFace', 'ScanLine', 'Scanner', 'Scanner2', 'QrScan'],

  // ============================================
  // WEATHER & NATURE
  // ============================================

  // Weather
  weather: ['Cloud', 'CloudRain', 'CloudSnow', 'CloudSun', 'Sun', 'Moon', 'Wind', 'Thermometer'],
  sunny: ['Sun', 'CloudSun', 'Sunrise', 'Sunset'],
  cloudy: ['Cloud', 'CloudFog', 'CloudSun'],
  rain: ['CloudRain', 'CloudDrizzle', 'Droplet', 'Umbrella'],
  rainy: ['CloudRain', 'CloudDrizzle', 'Umbrella'],
  snow: ['CloudSnow', 'Snowflake'],
  snowy: ['CloudSnow', 'Snowflake'],
  storm: ['CloudLightning', 'CloudRain', 'Wind', 'Tornado'],
  lightning: ['CloudLightning', 'Zap'],
  thunder: ['CloudLightning', 'Zap'],
  fog: ['CloudFog', 'Cloud'],
  wind: ['Wind', 'Tornado', 'CloudFog'],
  hot: ['Thermometer', 'Sun', 'Flame', 'Temperature'],
  cold: ['Thermometer', 'Snowflake', 'CloudSnow', 'Temperature'],
  temperature: ['Thermometer', 'Thermometer2', 'Temperature', 'TemperatureDial'],

  // Nature
  nature: ['Leaf', 'Leaf2', 'Tree', 'Tree2', 'Flower', 'Flower2', 'Mountain', 'Sun', 'Moon'],
  tree: ['Tree', 'Tree2', 'TreePalm', 'TreePine', 'PineTree', 'Forest'],
  plant: ['Plant2', 'Leaf', 'Leaf2', 'Seedling', 'Sprout', 'Flower'],
  flower: ['Flower', 'Flower2', 'Rose', 'Tulip'],
  leaf: ['Leaf', 'Leaf2', 'Tree', 'Plant2'],
  forest: ['Forest', 'Tree', 'Tree2', 'TreePine'],
  ocean: ['Ocean', 'Waves', 'Fish', 'Ship', 'Anchor'],
  sea: ['Ocean', 'Waves', 'Fish', 'Ship', 'Beach'],
  water: ['Droplet', 'Waves', 'Ocean', 'River', 'Lake', 'Pool'],
  mountain: ['Mountain', 'MountainSnow', 'Hiking'],
  beach: ['Beach', 'Umbrella', 'Sun', 'Waves', 'TreePalm'],

  // ============================================
  // TRANSPORTATION & TRAVEL
  // ============================================

  // Vehicles
  car: ['Car', 'CarFront', 'PoliceCar', 'Fuel', 'Parking'],
  vehicle: ['Car', 'CarFront', 'Bus', 'Train', 'Truck', 'Motorcycle'],
  bus: ['Bus', 'Train'],
  train: ['Train', 'Bus'],
  plane: ['Plane', 'PlaneTakeoff', 'PlaneLanding', 'Airport'],
  airplane: ['Plane', 'PlaneTakeoff', 'PlaneLanding', 'Airport'],
  flight: ['Plane', 'PlaneTakeoff', 'PlaneLanding', 'Airport', 'BoardingPass'],
  ship: ['Ship', 'Boat', 'Sailboat', 'Cruise', 'Anchor'],
  boat: ['Boat', 'Ship', 'Sailboat', 'Cruise', 'Anchor'],
  bike: ['Bike', 'Bicycle', 'Cycling'],
  bicycle: ['Bicycle', 'Bike', 'Cycling'],
  motorcycle: ['Motorcycle', 'Scooter'],
  truck: ['Truck', 'Shipping', 'ShippingFast'],

  // Travel
  travel: ['Plane', 'PlaneTakeoff', 'Globe', 'Map', 'Luggage', 'Passport', 'Hotel'],
  trip: ['Plane', 'Car', 'Map', 'Luggage', 'RoadTrip'],
  vacation: ['Beach', 'Plane', 'Hotel', 'Luggage', 'Sun', 'TreePalm'],
  holiday: ['Beach', 'Plane', 'Hotel', 'Gift', 'Calendar'],
  airport: ['Airport', 'Plane', 'PlaneTakeoff', 'PlaneLanding', 'BoardingPass'],
  hotel: ['Hotel', 'HotelBed', 'HotelKey', 'Building', 'Bed'],
  passport: ['Passport', 'Passport2', 'Plane'],
  luggage: ['Luggage', 'Baggage', 'BaggageClaim', 'CarryOn'],
  suitcase: ['Luggage', 'Baggage', 'CarryOn', 'Briefcase2'],
  ticket: ['Ticket', 'BoardingPass', 'FlightTicket', 'Coupon'],

  // ============================================
  // FOOD & DRINK
  // ============================================

  // Food
  food: ['Utensils', 'UtensilsCrossed', 'Pizza', 'Burger', 'Apple', 'Coffee', 'Fork', 'Knife2'],
  eat: ['Utensils', 'UtensilsCrossed', 'Fork', 'Spoon2'],
  restaurant: ['Utensils', 'UtensilsCrossed', 'ChefHat', 'Fork', 'Store'],
  meal: ['Utensils', 'UtensilsCrossed', 'Plate', 'Fork', 'Knife2'],
  breakfast: ['Coffee', 'Egg2', 'Bacon', 'Bread', 'Croissant'],
  lunch: ['Sandwich', 'Burger', 'Salad', 'Utensils'],
  dinner: ['Utensils', 'UtensilsCrossed', 'Steak', 'Wine', 'Plate'],

  // Drinks
  drink: ['Coffee', 'Cup', 'Wine', 'Beer', 'Martini'],
  beverage: ['Coffee', 'Cup', 'Wine', 'Beer'],
  coffee: ['Coffee', 'Cup'],
  tea: ['Coffee', 'Cup', 'Kettle'],
  wine: ['Wine', 'Grape'],
  beer: ['Beer'],
  alcohol: ['Wine', 'Beer', 'Martini'],

  // ============================================
  // HEALTH & MEDICAL
  // ============================================

  // Medical
  medical: ['Stethoscope', 'Stethoscope2', 'Pill', 'Syringe', 'Hospital', 'MedicalCross', 'FirstAid'],
  health: ['Heart', 'HeartPulse', 'Activity', 'Stethoscope', 'Pill', 'Hospital'],
  doctor: ['Stethoscope', 'Stethoscope2', 'Hospital', 'MedicalBag', 'BriefcaseMedical'],
  nurse: ['Stethoscope', 'Hospital', 'MedicalCross', 'Heart'],
  hospital: ['Hospital', 'Ambulance', 'MedicalCross', 'Stethoscope', 'Building'],
  medicine: ['Pill', 'Pill2', 'Pills', 'Capsule', 'Syringe', 'Prescription'],
  pill: ['Pill', 'Pill2', 'Pills', 'Capsule'],
  drug: ['Pill', 'Pills', 'Capsule', 'Syringe'],
  vaccine: ['Vaccine', 'Syringe', 'Syringe2', 'Shield'],
  emergency: ['Emergency', 'Ambulance', 'Ambulance2', 'AlertTriangle', 'AlertCircle'],

  // Wellness / Fitness
  wellness: ['Heart', 'HeartPulse', 'Activity', 'Spa', 'Dumbbell'],
  fitness: ['Dumbbell', 'Running', 'Cycling', 'Weight', 'Activity'],
  exercise: ['Dumbbell', 'Running', 'Cycling', 'Weight', 'Activity'],
  gym: ['Dumbbell', 'Weight', 'Running', 'Activity'],
  workout: ['Dumbbell', 'Running', 'Activity', 'Timer'],

  // ============================================
  // EDUCATION & LEARNING
  // ============================================

  // Education
  education: ['GraduationCap', 'Book', 'BookOpen', 'School', 'Pencil', 'Notebook'],
  learning: ['Book', 'BookOpen', 'GraduationCap', 'Lightbulb', 'Brain'],
  study: ['Book', 'BookOpen', 'Notebook', 'Pencil', 'Library'],
  school: ['School', 'GraduationCap', 'Book', 'Bus', 'Backpack'],
  university: ['University', 'GraduationCap', 'Library', 'Book', 'Building'],
  college: ['University', 'GraduationCap', 'Library', 'Book'],
  student: ['GraduationCap', 'Book', 'Backpack', 'StudentId', 'Pencil'],
  teacher: ['GraduationCap', 'Chalkboard', 'Whiteboard', 'Book', 'Presentation'],
  class: ['Classroom', 'Chalkboard', 'Users', 'Book'],
  classroom: ['Classroom', 'Chalkboard', 'Whiteboard', 'Desk'],

  // Books / Reading
  book: ['Book', 'BookOpen', 'BookMarked', 'BookClosed', 'Library', 'Notebook'],
  read: ['Book', 'BookOpen', 'Eye', 'Glasses'],
  reading: ['Book', 'BookOpen', 'Glasses', 'Eye'],
  library: ['Library', 'Library2', 'Bookshelf', 'Book', 'BookOpen'],
  notebook: ['Notebook', 'Notebook2', 'NotebookPen', 'NotebookPen2', 'Book'],

  // ============================================
  // BUSINESS & WORK
  // ============================================

  // Business
  business: ['Briefcase2', 'Building', 'Building2', 'Office', 'Team', 'Handshake'],
  work: ['Briefcase2', 'Building', 'Office', 'Laptop', 'Calendar'],
  job: ['Briefcase2', 'Building', 'Office', 'Search', 'FileText'],
  career: ['Briefcase2', 'TrendingUp', 'Star', 'Award'],
  office: ['Office', 'Building', 'Building2', 'Desk', 'Laptop'],
  company: ['Building', 'Building2', 'Office', 'Users', 'Team'],
  corporate: ['Building', 'Building2', 'Briefcase2', 'Tie'],

  // Meeting / Presentation
  meeting: ['Meeting', 'Users', 'Calendar', 'Video', 'MessageSquare'],
  presentation: ['Presentation', 'Presentation2', 'Monitor', 'BarChart', 'PieChart'],
  conference: ['Meeting', 'Users', 'Video', 'Building', 'Calendar'],
  webinar: ['Video', 'Presentation', 'Monitor', 'Users'],

  // Contract / Agreement
  contract: ['Contract', 'Contract2', 'FileText', 'Pen', 'ClipboardSignature'],
  agreement: ['Contract', 'Handshake', 'Handshake2', 'FileText', 'Check'],
  signature: ['ClipboardSignature', 'Pen', 'PenLine', 'Edit'],
  sign: ['Sign', 'ClipboardSignature', 'Pen', 'Edit'],

  // ============================================
  // SOCIAL & EMOTIONS
  // ============================================

  // Emotions
  happy: ['Happy', 'Smile', 'ThumbsUp', 'Heart', 'Star'],
  sad: ['Sad', 'Frown', 'Cry', 'ThumbsDown'],
  angry: ['Angry', 'Frown', 'ThumbsDown', 'AlertTriangle'],
  love: ['Love', 'Heart', 'HeartShape', 'ThumbsUp'],
  like: ['Like', 'LikeFilled', 'ThumbsUp', 'Heart', 'Star'],
  dislike: ['Dislike', 'ThumbsDown', 'X', 'XCircle'],
  favorite: ['Heart', 'HeartShape', 'Star', 'Bookmark', 'Like'],
  star: ['Star', 'Award', 'Medal', 'Badge2'],

  // Social Actions
  follow: ['Follow', 'Follow2', 'UserPlus', 'Plus'],
  unfollow: ['Unfollow', 'Unfollow2', 'UserMinus', 'UserX'],
  post: ['Post', 'Send', 'MessageSquare', 'Edit'],
  repost: ['Repost', 'Repeat', 'Share', 'Share2'],
  reaction: ['Reaction', 'Heart', 'ThumbsUp', 'Smile'],
  story: ['Story', 'Camera', 'Circle', 'Clock'],
  feed: ['Feed', 'List', 'Activity'],
  viral: ['Viral', 'Trending', 'Flame', 'Zap', 'TrendingUp'],
  influencer: ['Influencer', 'User', 'Star', 'Crown', 'Trending'],

  // ============================================
  // GAMING
  // ============================================

  // Gaming
  game: ['Gamepad', 'Gamepad2', 'Console', 'Controller', 'Joystick', 'Dice1'],
  gaming: ['Gamepad', 'Gamepad2', 'Console', 'Controller', 'Joystick', 'Trophy'],
  player: ['User', 'Gamepad', 'Controller', 'Trophy'],
  score: ['Trophy', 'Medal', 'Star', 'HighScore', 'Leaderboard'],
  leaderboard: ['Leaderboard', 'Trophy', 'Medal', 'BarChart', 'List'],
  achievement: ['Achievement', 'Trophy', 'Medal', 'Star', 'Award'],
  level: ['LevelUp', 'Star', 'TrendingUp', 'BarChart'],
  quest: ['Quest', 'Map', 'Compass', 'Star'],
  multiplayer: ['Multiplayer', 'Users', 'Gamepad', 'Wifi'],
  controller: ['Controller', 'ControllerWireless', 'Gamepad', 'Gamepad2'],
  joystick: ['Joystick', 'Joystick2', 'Gamepad', 'Controller'],
  dice: ['Dice1', 'Dice2', 'Dice3', 'Dice4', 'Dice5', 'Dice6'],
  puzzle: ['Puzzle', 'PuzzlePiece', 'Brain', 'Lightbulb'],

  // ============================================
  // SPORTS
  // ============================================

  // Sports
  sports: ['Trophy', 'Medal', 'Award', 'Running', 'Dumbbell', 'Target'],
  sport: ['Trophy', 'Medal', 'Running', 'Dumbbell'],
  trophy: ['Trophy', 'Trophy2', 'Medal', 'Medal2', 'Award', 'Star'],
  medal: ['Medal', 'Medal2', 'Trophy', 'Award', 'Star'],
  winner: ['Trophy', 'Medal', 'Crown', 'Award', 'Star'],
  champion: ['Trophy', 'Medal', 'Crown', 'Award'],
  athlete: ['Running', 'Dumbbell', 'Trophy', 'Medal'],
  race: ['Running', 'Timer', 'Stopwatch'],
  run: ['Running', 'Timer'],
  swim: ['Swimming', 'Waves', 'Pool'],
  golf: ['Golf', 'Target'],
  tennis: ['Tennis', 'Target'],
  basketball: ['Basketball', 'Trophy'],
  football: ['Football', 'Soccer', 'Trophy'],
  soccer: ['Soccer', 'Football', 'Trophy'],
  baseball: ['Baseball', 'Trophy'],

  // ============================================
  // SHAPES & GEOMETRY
  // ============================================

  // Shapes
  shape: ['Circle', 'Square', 'Triangle', 'Rectangle', 'Diamond', 'Hexagon'],
  circle: ['Circle', 'Oval', 'Disc', 'Record'],
  square: ['Square', 'Rectangle', 'CheckSquare', 'XSquare'],
  triangle: ['Triangle', 'AlertTriangle', 'Play'],
  rectangle: ['Rectangle', 'Square', 'Layout'],
  diamond: ['Diamond', 'Star', 'Sparkles'],
  hexagon: ['Hexagon'],

  // ============================================
  // TEXT & FORMATTING
  // ============================================

  // Text
  text: ['Text', 'TextCursor', 'TextSize', 'FileText'],
  font: ['Text', 'TextSize', 'Bold', 'Italic'],
  format: ['Bold', 'Italic', 'Underline', 'Text', 'TextSize'],
  bold: ['Bold', 'Text'],
  italic: ['Italic', 'Text'],
  underline: ['Underline', 'Text'],
  strikethrough: ['Strikethrough', 'Text', 'X'],
  heading: ['Heading1', 'Heading2', 'Heading3', 'Text'],
  paragraph: ['Text', 'FileText'],
  quote: ['Quote', 'MessageSquare', 'Text'],

  // ============================================
  // MISC CONCEPTS
  // ============================================

  // Ideas / Creativity
  idea: ['Lightbulb', 'Brain', 'Sparkles', 'Wand', 'WandSparkles'],
  creative: ['Lightbulb', 'Palette', 'Brush', 'Sparkles', 'Wand'],
  creativity: ['Lightbulb', 'Palette', 'Brush', 'Sparkles', 'Brain'],
  inspiration: ['Lightbulb', 'Sparkles', 'Star', 'Zap'],
  magic: ['Wand', 'Wand2', 'WandSparkles', 'Sparkles', 'Star'],
  sparkle: ['Sparkles', 'Star', 'Zap', 'Wand'],

  // Power / Energy
  power: ['Zap', 'Battery', 'BatteryCharging', 'Plug2', 'Outlet'],
  energy: ['Zap', 'Battery', 'Flame', 'Sun'],
  electricity: ['Zap', 'Plug2', 'Outlet', 'Battery'],
  battery: ['Battery', 'BatteryCharging', 'BatteryLow', 'BatteryEmpty', 'BatteryHalf', 'BatteryQuarter', 'BatteryThreeQuarters'],
  charge: ['BatteryCharging', 'Battery', 'Zap', 'Plug2'],

  // AI / Automation
  ai: ['ChipAi', 'Bot', 'Robot', 'BrainCircuit', 'BrainCog', 'MessageAi', 'Sparkles'],
  artificial: ['ChipAi', 'Bot', 'Robot', 'BrainCircuit', 'BrainCog'],
  intelligence: ['Brain', 'BrainCircuit', 'BrainCog', 'ChipAi', 'Lightbulb'],
  bot: ['Bot', 'Robot', 'ChipAi', 'MessageAi'],
  robot: ['Robot', 'Bot', 'ChipAi', 'Cpu'],
  automation: ['Automation', 'Bot', 'Robot', 'Workflow', 'Repeat'],
  machine: ['Robot', 'Bot', 'ChipAi', 'Cpu', 'Server'],

  // Global / World / International
  global: ['Globe', 'Globe2', 'Map'],
  world: ['Globe', 'Globe2', 'Map', 'Plane'],
  international: ['Globe', 'Globe2', 'Plane'],
  earth: ['Globe', 'Globe2', 'Leaf', 'Tree'],
  planet: ['Globe', 'Globe2', 'Moon', 'Sun', 'Star'],

  // Accessibility
  accessibility: ['Accessibility', 'Wheelchair', 'Wheelchair2', 'EarHearing', 'Eye', 'Hand'],
  accessible: ['Accessibility', 'Wheelchair', 'EarHearing', 'Eye'],
  handicap: ['Wheelchair', 'Wheelchair2', 'Accessibility'],
  blind: ['Eye', 'EyeOff', 'ScreenReader', 'Braille'],
  deaf: ['EarOff', 'EarHearing', 'ClosedCaption', 'Subtitle'],

  // Misc
  link: ['Link', 'ExternalLink', 'ExternalLink2', 'Chain', 'Hyperlink'],
  anchor: ['Anchor', 'Anchor2', 'Link', 'Ship'],
  flag: ['Bookmark', 'AlertTriangle'],
  bookmark: ['Bookmark', 'Star', 'Heart'],
  award: ['Award', 'Trophy', 'Medal', 'Star', 'Crown'],
  gift: ['Gift', 'Package'],
  present: ['Gift', 'Package'],
  surprise: ['Gift', 'Sparkles', 'Star', 'Surprised'],
  crown: ['Crown', 'Award', 'Star', 'Trophy'],
  target: ['Target', 'Target2', 'Crosshair', 'Crosshair2', 'Focus'],
  goal: ['Target', 'Target2', 'Trophy', 'CheckCircle'],
  focus: ['Focus', 'Target', 'Crosshair', 'FocusRing', 'Eye'],
  highlight: ['Highlighter', 'Spotlight', 'Star', 'Sparkles'],
  fire: ['Flame', 'Trending', 'Zap', 'AlertTriangle'],
  cool: ['Cool', 'Snowflake', 'Star', 'ThumbsUp'],
  premium: ['Crown', 'Star', 'Diamond', 'Award', 'Shield'],
  pro: ['Crown', 'Star', 'Award', 'BadgeCheck', 'Shield'],
  vip: ['Crown', 'Star', 'Diamond', 'Award'],

  // ============================================
  // BRANDS (common search terms)
  // ============================================

  github: ['Github', 'GitBranch', 'Code'],
  twitter: ['Twitter', 'XTwitter', 'Bird'],
  x: ['X', 'XTwitter', 'XCircle', 'XSquare'],
  discord: ['Discord', 'MessageCircle', 'Chat'],
  slack: ['Slack', 'MessageSquare', 'Chat'],
  linkedin: ['Linkedin', 'Briefcase2', 'User'],
  instagram: ['Instagram', 'Camera'],
  facebook: ['Facebook', 'ThumbsUp'],
  youtube: ['Youtube', 'Video', 'Play'],
  spotify: ['Spotify', 'Music', 'Headphones'],
  netflix: ['Netflix', 'Film', 'Tv'],
  twitch: ['Twitch', 'Video', 'Gamepad'],
  figma: ['Figma', 'Palette', 'Pen'],
  notion: ['Notion', 'FileText', 'Notebook'],
  stripe: ['Stripe', 'CreditCard', 'DollarSign'],
  paypal: ['Paypal', 'DollarSign', 'Wallet'],
  amazon: ['Amazon', 'ShoppingCart', 'Package'],
  google: ['GoogleCloud', 'Search', 'Globe'],
  microsoft: ['Teams', 'Monitor', 'Building'],
  apple: ['Apple', 'Laptop', 'Smartphone'],
  react: ['ReactLogo', 'Code', 'Atom2'],
  vue: ['Vue', 'Code'],
  angular: ['Angular', 'Code'],
  svelte: ['Svelte', 'Code'],
  nextjs: ['Nextjs', 'Code', 'ReactLogo'],
  vercel: ['Vercel', 'Cloud', 'Rocket'],
  aws: ['Aws', 'Cloud', 'Server'],
  azure: ['Azure', 'Cloud', 'Server'],
  npm: ['Npm', 'Package', 'Code'],
  nodejs: ['Nodejs', 'Code', 'Server'],
  vscode: ['Vscode', 'Code', 'Edit'],
  chrome: ['Chrome', 'Globe', 'Search'],
  firefox: ['Firefox', 'Globe', 'Search'],
  safari: ['Safari', 'Compass', 'Globe'],
  whatsapp: ['Whatsapp', 'MessageCircle', 'Phone'],
  telegram: ['Telegram', 'Send', 'MessageCircle'],
  zoom: ['Zoom', 'Video', 'Camera'],
  bitcoin: ['Bitcoin', 'DollarSign', 'Coin'],
  crypto: ['Bitcoin', 'Coin', 'DollarSign'],
  cryptocurrency: ['Bitcoin', 'Coin', 'DollarSign', 'Wallet'],
}

/**
 * Helper to get all keywords for an icon (reverse lookup)
 * Returns all keywords that map to the given icon name
 */
export function getKeywordsForIcon(iconName: string): string[] {
  const keywords: string[] = []

  for (const [keyword, icons] of Object.entries(iconKeywords)) {
    if (icons.includes(iconName)) {
      keywords.push(keyword)
    }
  }

  return keywords.sort()
}

/**
 * Helper to search icons by keyword
 * Returns all icon names that match the given keyword (case-insensitive)
 * Also performs partial matching for longer queries
 */
export function searchByKeyword(query: string): string[] {
  const normalizedQuery = query.toLowerCase().trim()

  // Direct match
  if (iconKeywords[normalizedQuery]) {
    return [...iconKeywords[normalizedQuery]]
  }

  // Partial match - find keywords that start with or contain the query
  const matchedIcons = new Set<string>()

  for (const [keyword, icons] of Object.entries(iconKeywords)) {
    if (keyword.startsWith(normalizedQuery) || keyword.includes(normalizedQuery)) {
      icons.forEach((icon) => matchedIcons.add(icon))
    }
  }

  return Array.from(matchedIcons)
}

/**
 * Get all available keywords
 * Useful for autocomplete suggestions
 */
export function getAllKeywords(): string[] {
  return Object.keys(iconKeywords).sort()
}

/**
 * Get icon suggestions based on multiple keywords
 * Returns icons sorted by relevance (number of matching keywords)
 */
export function searchByMultipleKeywords(keywords: string[]): string[] {
  const iconScores = new Map<string, number>()

  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase().trim()
    const matchingIcons = searchByKeyword(normalizedKeyword)

    for (const icon of matchingIcons) {
      iconScores.set(icon, (iconScores.get(icon) || 0) + 1)
    }
  }

  // Sort by score (descending) and return icon names
  return Array.from(iconScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([icon]) => icon)
}

export const demofiConfig = {
  actions: [
    "option A",
    "option B",
    "option C",
    "option D",
    "option E",
    "option F"
  ],
  defaultAction: "option A",
  inputPlaceHolder: "Input Some Data",
  availableLabels: ['NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB'],
}

export const demofiDownloads = [
  {
    label: "RawData",
    transform: (data) => {
      return JSON.stringify(data)
    } 
  },
  {
    label: "Data length",
    transform: (data) => {
      return data.length
    } 
  }
]
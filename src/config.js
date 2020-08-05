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
  availableLabels: ['NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB','NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB', 'NN', 'JJ', 'DT', 'UH', 'VBZ', 'RB'],
}


// Transform function returns the string that will be downloaded
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
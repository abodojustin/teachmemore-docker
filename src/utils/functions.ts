export const atLeastFiveUnique = <T>(array: T) => {
  if (Array.isArray(array) && array.length >= 5) {
    const uniqueElements = new Set(array);
    if (uniqueElements.size >= 5) {
      return array;
    }
  }
  throw new Error("questions must have at least five unique elements.");
};

// Fonction pour calculer la moyenne d'une propriété spécifiée d'un tableau d'objets
export async function calculateAverageAsync(values: { theme: any; average: number }[][]): Promise<number> {
  const flattenedAverages = ([] as { theme: any; average: number }[]).concat(...values);

  if (flattenedAverages.length === 0) {
    return 0; // ou une valeur par défaut appropriée
  }

  const sum: number = flattenedAverages.reduce((total, { average }) => {
    if (average !== undefined) {
      return total + average;
    }
    return total;
  }, 0);

  const average: number = sum / flattenedAverages.length;

  return parseFloat(average.toFixed(2));
}

export async function calculateSumPerLines(values: { theme: any; average: number }[][]): Promise<number> {
  const flattenedAverages = ([] as { theme: any; average: number }[]).concat(...values);

  if (flattenedAverages.length === 0) {
    return 0; // ou une valeur par défaut appropriée
  }

  const sum: number = flattenedAverages.reduce((total, { average }) => {
    if (average !== undefined) {
      return total + average;
    }
    return total;
  }, 0);

  return sum;
}

// Fonction pour calculer la somme d'un tableau de valeurs
export async function calculateSumAsync(values: number[]): Promise<number> {
  const sum: number = values.reduce((total, value) => total + value, 0);
  return sum;
}

// Fonction pour calculer le pourcentage d'une valeur par rapport à la somme totale
export async function calculatePercentageAsync(value: number, total: number): Promise<number> {
  if (total === 0) {
    return 0; // ou toute autre valeur par défaut appropriée
  }
  const percentage: number = (value / total) * 100;
  return parseFloat(percentage.toFixed(2));
}

export function calculateCumulativeAscending(totals: number[]): number[] {
  const cumulativeAscending: number[] = [];
  let sum = 0;

  for (const value of totals) {
    sum += value;
    cumulativeAscending.push(sum);
  }

  return cumulativeAscending;
}

export function calculateCumulativeDescending(totals: number[]): number[] {
  const cumulativeDescending: number[] = [];
  let sum = totals.reduce((total, value) => total + value, 0);

  for (const value of totals) {
    cumulativeDescending.push(sum);
    sum -= value;
  }

  // Ajouter la valeur du premier index divisé par 2 à la fin du tableau
  const firstIndexValue = (cumulativeDescending[0] / 2);
  cumulativeDescending.push(firstIndexValue);

  return cumulativeDescending;
}

// Fonction pour trouver le plus petit nombre positif dans un tableau
export function trouverPlusPetitPositif(tableau: number[]): number | undefined {
  let plusPetitPositif: number | undefined = undefined;

  // Parcourir le tableau
  for (const nombre of tableau) {
      // Vérifier si le nombre est positif
      if (nombre > 0) {
          // Mettre à jour la variable si elle n'est pas encore définie ou si le nombre est plus petit
          if (plusPetitPositif === undefined || nombre < plusPetitPositif) {
              plusPetitPositif = nombre;
          }
      }
  }

  return plusPetitPositif;
}

// Fonction pour trouver le plus grand nombre négatif dans un tableau
export function trouverPlusGrandNegatif(tableau: number[]): number | undefined {
    let plusGrandNegatif: number | undefined = undefined;

    // Parcourir le tableau
    for (const nombre of tableau) {
        // Vérifier si le nombre est négatif
        if (nombre < 0) {
            // Mettre à jour la variable si elle n'est pas encore définie ou si le nombre est plus grand
            if (plusGrandNegatif === undefined || nombre > plusGrandNegatif) {
                plusGrandNegatif = nombre;
            }
        }
    }

    return plusGrandNegatif;
}

export function remplacerNombreEtZeros(
  tableau: number[],
  resultatPlusPetitPositif: number | undefined,
  barycentre: number
): number[] {
  // Créer un nouveau tableau en remplaçant les valeurs
  const nouveauTableau: number[] = tableau.map((nombre) => {
    if (nombre === resultatPlusPetitPositif) {
      return barycentre;
    } else {
      return 0;
    }
  });

  return nouveauTableau;
}
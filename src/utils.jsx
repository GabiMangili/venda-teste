import { View, Text } from 'react-native'
import React from 'react'
import validator from 'validator';
import { validate as validateCPF } from 'gerador-validador-cpf';
import { isDate, parseISO } from 'date-fns';
import dayjs from 'dayjs';

export function transformDate(inputDate) {
    if(!inputDate){
      return ''
    }
    const parts = inputDate.split('/');
    const transformedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log(transformedDate)

    return transformedDate.toString();
  }

  export function removeSpaces(text) {
    var textWithouSpaces = text.replaceAll(" ", '')

    return textWithouSpaces;
  }

  export function transformDateBR(date){//yyyy-mm-dd para dd-mm-yyyy
    return date.substring(0, 10).split("-").reverse().join("-")
  }

  //VALIDATES

export const validateRequired = (value) => {
    if (!value) {
      return 'Campo obrigatório';
    }
    return null;
  };

export const validateInputDate = (dateString) => {
    const requiredError = validateRequired(dateString);
    if (requiredError) {
        return requiredError;
    }

    const date = parseISO(dateString);
    console.log('Date: ')
    console.log(date)
    console.log(validator.isDate(date))
    console.log(date > new Date())
    if (!validator.isDate(date) || date > new Date() || dateString.length != 10) {
        return 'Data inválida';
    }

    return null;
}

export const validateCPFNumber = (cpf) => {
    const requiredError = validateRequired(cpf);
    if (requiredError) {
        return requiredError;
    }

    if (!validateCPF(cpf)) {
        return 'CPF inválido';
    }

    return null;
}

export const validateEmail = (email) => {
    const requiredError = validateRequired(email);
    if (requiredError) {
        return requiredError;
    }

    if (!validator.isEmail(email)) {
        return 'E-mail inválido';
    }

    return null;
}
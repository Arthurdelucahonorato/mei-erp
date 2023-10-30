import React, { useState } from 'react';
import ComboBox from '@/components/ComboBox';
import { Button } from '@/components/Button';

const reportTypes = [
  { value: 'PRODUTOS', name: 'Relatório de Produtos' },
  { value: 'CLIENTES', name: 'Relatório de Clientes' },
];

export default function Relatorios() {
  const [selectedReport, setSelectedReport] = useState(reportTypes[0].name);

  const renderForm = () => {
    const inputStyle = "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded p-2 w-full";

    const renderInput = (label: string, placeholder: string) => (
      <div className="col-span-3 md:col-span-4 md:px-4">
        <label className="block text-gray-700 dark:text-white text-sm font-semibold mb-2">
          {label}
        </label>
        <input type="text" placeholder={placeholder} className={inputStyle} />
      </div>
    );

    switch (selectedReport) {
      case 'Relatório de Produtos':
        return (
          <div className="grid gap-4 grid-cols-3 px-3 md:grid-cols-12">
            {renderInput("ID do Produto", "ID do Produto")}
            {renderInput("Categoria", "Categoria")}
            {renderInput("Data de Início", "Data de Início")}
            {renderInput("Data de Fim", "Data de Fim")}
            {renderInput("Dados", "Dados")}
            {renderInput("Dados", "Dados")}
            {renderInput("Dados", "Dados")}
            {renderInput("Dados", "Dados")}
          </div>
        );
        break;
      case 'Relatório de Clientes':
        return (
          <div className="grid gap-4 grid-cols-3 px-3 md:grid-cols-12">
            {renderInput("ID do Cliente", "ID do Cliente")}
            {renderInput("Nome do Cliente", "Nome do Cliente")}
            {renderInput("Data de Início", "Data de Início")}
            {renderInput("Data de Fim", "Data de Fim")}
            {renderInput("Dados", "Dados")}
            {renderInput("Dados", "Dados")}
            {renderInput("Dados", "Dados")}
            {renderInput("Dados", "Dados")}
          </div>
        );
        break;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div>
        <ComboBox
          value={selectedReport}
          values={reportTypes}
          label="Tipo de Relatório"
          required
          errorMessage=""
          onChangeValue={(v) => setSelectedReport(v)}
        />
        {renderForm()}
      </div>
      <div className="mt-8 flex justify-end">
        <Button className="bg-pink-500 text-white rounded w-auto">Enviar</Button>
      </div>
    </div>
  );
}

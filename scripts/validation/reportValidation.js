function reportValidation({ counts, errors, warnings }) {
  if (warnings.length) {
    console.warn(`Data validation warnings (${warnings.length}):`);
    for (const warning of warnings.slice(0, 20)) console.warn(`- ${warning}`);
    if (warnings.length > 20) console.warn(`- ...${warnings.length - 20} more`);
  }

  if (errors.length) {
    console.error(`Data validation failed (${errors.length}):`);
    for (const error of errors.slice(0, 60)) console.error(`- ${error}`);
    if (errors.length > 60) console.error(`- ...${errors.length - 60} more`);
    process.exit(1);
  }

  console.log(`Data validation passed: ${JSON.stringify(counts)}`);
}

module.exports = { reportValidation };
